// Service de Notifications Intelligentes pour Valorix
class NotificationService {
  constructor() {
    this.notifications = [];
    this.subscribers = new Map();
    this.emailService = new EmailService();
    this.smsService = new SMSService();
  }

  // Envoi de notification multi-canal
  async sendNotification(notification) {
    try {
      const { type, priority, channels, recipients, content } = notification;
      
      // Notification in-app
      if (channels.includes('app')) {
        await this.sendInAppNotification(notification);
      }
      
      // Email
      if (channels.includes('email')) {
        await this.emailService.send({
          to: recipients.email,
          subject: content.title,
          body: content.message,
          template: 'valorix-notification'
        });
      }
      
      // SMS pour les alertes critiques
      if (channels.includes('sms') && priority === 'critical') {
        await this.smsService.send({
          to: recipients.phone,
          message: content.shortMessage || content.message
        });
      }
      
      // Push notification
      if (channels.includes('push')) {
        await this.sendPushNotification(notification);
      }
      
      return { success: true, notificationId: this.generateId() };
    } catch (error) {
      console.error('Erreur envoi notification:', error);
      return { success: false, error: error.message };
    }
  }

  // Notification in-app
  async sendInAppNotification(notification) {
    const inAppNotif = {
      id: this.generateId(),
      type: notification.type,
      title: notification.content.title,
      message: notification.content.message,
      priority: notification.priority,
      timestamp: new Date().toISOString(),
      read: false,
      actions: notification.actions || []
    };
    
    this.notifications.unshift(inAppNotif);
    
    // Limiter à 100 notifications
    if (this.notifications.length > 100) {
      this.notifications = this.notifications.slice(0, 100);
    }
    
    // Notifier les abonnés
    this.notifySubscribers('new_notification', inAppNotif);
  }

  // Abonnement aux notifications temps réel
  subscribe(userId, callback) {
    this.subscribers.set(userId, callback);
  }

  // Désabonnement
  unsubscribe(userId) {
    this.subscribers.delete(userId);
  }

  // Notification des abonnés
  notifySubscribers(event, data) {
    this.subscribers.forEach(callback => {
      try {
        callback(event, data);
      } catch (error) {
        console.error('Erreur callback notification:', error);
      }
    });
  }

  // Récupération des notifications
  getNotifications(userId, limit = 20, offset = 0) {
    return {
      notifications: this.notifications.slice(offset, offset + limit),
      total: this.notifications.length,
      unread: this.notifications.filter(n => !n.read).length
    };
  }

  // Marquer comme lu
  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.notifySubscribers('notification_read', { id: notificationId });
    }
  }

  // Génération d'ID unique
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// Service d'Email
class EmailService {
  constructor() {
    this.templates = {
      'valorix-notification': {
        subject: 'Valorix - {{title}}',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">⚡ VALORIX</h1>
              <p style="color: white; margin: 5px 0;">Plateforme d'Évaluation d'Entreprise IA & Blockchain</p>
            </div>
            <div style="padding: 30px; background: white;">
              <h2 style="color: #333;">{{title}}</h2>
              <p style="color: #666; line-height: 1.6;">{{message}}</p>
              {{#if actionUrl}}
              <div style="text-align: center; margin: 30px 0;">
                <a href="{{actionUrl}}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">{{actionText}}</a>
              </div>
              {{/if}}
            </div>
            <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
              <p>Valorix - Révolutionnez la valorisation de votre entreprise</p>
              <p>Powered by AI & Blockchain</p>
            </div>
          </div>
        `
      }
    };
  }

  async send({ to, subject, body, template, data = {} }) {
    try {
      // Simulation d'envoi email
      console.log(`📧 Email envoyé à ${to}:`);
      console.log(`Sujet: ${subject}`);
      console.log(`Corps: ${body}`);
      
      // En production, utiliser un service comme SendGrid, Mailgun, etc.
      return { success: true, messageId: this.generateMessageId() };
    } catch (error) {
      console.error('Erreur envoi email:', error);
      return { success: false, error: error.message };
    }
  }

  generateMessageId() {
    return 'msg_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// Service SMS
class SMSService {
  constructor() {
    this.provider = 'twilio'; // ou autre fournisseur SMS
  }

  async send({ to, message }) {
    try {
      // Simulation d'envoi SMS
      console.log(`📱 SMS envoyé à ${to}:`);
      console.log(`Message: ${message}`);
      
      // En production, utiliser Twilio, AWS SNS, etc.
      return { success: true, messageId: this.generateMessageId() };
    } catch (error) {
      console.error('Erreur envoi SMS:', error);
      return { success: false, error: error.message };
    }
  }

  generateMessageId() {
    return 'sms_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// Service d'Intégration Comptable
class AccountingIntegrationService {
  constructor() {
    this.connectors = {
      sage: new SageConnector(),
      cegid: new CegidConnector(),
      quickbooks: new QuickBooksConnector()
    };
  }

  // Connexion à un logiciel comptable
  async connect(provider, credentials) {
    try {
      const connector = this.connectors[provider];
      if (!connector) {
        throw new Error(`Connecteur ${provider} non supporté`);
      }
      
      const connection = await connector.authenticate(credentials);
      return {
        success: true,
        connectionId: connection.id,
        provider: provider,
        status: 'connected'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Import automatique des données
  async importData(connectionId, options = {}) {
    try {
      const connection = await this.getConnection(connectionId);
      const connector = this.connectors[connection.provider];
      
      const data = await connector.fetchData({
        startDate: options.startDate || new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        endDate: options.endDate || new Date(),
        accounts: options.accounts || 'all'
      });
      
      return {
        success: true,
        data: this.normalizeData(data),
        recordCount: data.length
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Normalisation des données
  normalizeData(rawData) {
    return {
      balanceSheet: this.extractBalanceSheet(rawData),
      incomeStatement: this.extractIncomeStatement(rawData),
      cashFlow: this.extractCashFlow(rawData),
      metadata: {
        period: rawData.period,
        currency: rawData.currency || 'EUR',
        lastUpdate: new Date().toISOString()
      }
    };
  }

  extractBalanceSheet(data) {
    // Extraction et normalisation du bilan
    return {
      assets: {
        current: data.currentAssets || 0,
        fixed: data.fixedAssets || 0,
        total: (data.currentAssets || 0) + (data.fixedAssets || 0)
      },
      liabilities: {
        current: data.currentLiabilities || 0,
        longTerm: data.longTermLiabilities || 0,
        total: (data.currentLiabilities || 0) + (data.longTermLiabilities || 0)
      },
      equity: data.equity || 0
    };
  }

  extractIncomeStatement(data) {
    // Extraction et normalisation du compte de résultat
    return {
      revenue: data.revenue || 0,
      costs: data.costs || 0,
      grossProfit: (data.revenue || 0) - (data.costs || 0),
      operatingExpenses: data.operatingExpenses || 0,
      operatingIncome: ((data.revenue || 0) - (data.costs || 0)) - (data.operatingExpenses || 0),
      netIncome: data.netIncome || 0
    };
  }

  extractCashFlow(data) {
    // Extraction et normalisation des flux de trésorerie
    return {
      operating: data.operatingCashFlow || 0,
      investing: data.investingCashFlow || 0,
      financing: data.financingCashFlow || 0,
      net: (data.operatingCashFlow || 0) + (data.investingCashFlow || 0) + (data.financingCashFlow || 0)
    };
  }
}

// Connecteurs spécialisés
class SageConnector {
  async authenticate(credentials) {
    // Simulation de connexion Sage
    return { id: 'sage_' + Date.now(), status: 'connected' };
  }

  async fetchData(options) {
    // Simulation de récupération de données Sage
    return {
      revenue: 1250000,
      costs: 750000,
      currentAssets: 450000,
      fixedAssets: 340000,
      currentLiabilities: 280000,
      longTermLiabilities: 190000,
      equity: 320000,
      period: '2024',
      currency: 'EUR'
    };
  }
}

class CegidConnector {
  async authenticate(credentials) {
    return { id: 'cegid_' + Date.now(), status: 'connected' };
  }

  async fetchData(options) {
    return {
      revenue: 1180000,
      costs: 710000,
      currentAssets: 420000,
      fixedAssets: 380000,
      currentLiabilities: 260000,
      longTermLiabilities: 210000,
      equity: 330000,
      period: '2024',
      currency: 'EUR'
    };
  }
}

class QuickBooksConnector {
  async authenticate(credentials) {
    return { id: 'qb_' + Date.now(), status: 'connected' };
  }

  async fetchData(options) {
    return {
      revenue: 1320000,
      costs: 790000,
      currentAssets: 480000,
      fixedAssets: 360000,
      currentLiabilities: 300000,
      longTermLiabilities: 180000,
      equity: 360000,
      period: '2024',
      currency: 'EUR'
    };
  }
}

// Service de Veille Économique
class EconomicWatchService {
  constructor() {
    this.dataSources = {
      insee: new INSEEConnector(),
      banqueFrance: new BanqueFranceConnector(),
      eurostat: new EurostatConnector()
    };
    this.cache = new Map();
  }

  // Récupération des indicateurs économiques
  async getEconomicIndicators(sector, region = 'FR') {
    const cacheKey = `indicators_${sector}_${region}`;
    
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < 3600000) { // 1 heure
        return cached.data;
      }
    }

    try {
      const [inseeData, bfData, eurostatData] = await Promise.all([
        this.dataSources.insee.getIndicators(sector, region),
        this.dataSources.banqueFrance.getIndicators(sector),
        this.dataSources.eurostat.getIndicators(sector, region)
      ]);

      const indicators = this.aggregateIndicators(inseeData, bfData, eurostatData);
      
      this.cache.set(cacheKey, {
        data: indicators,
        timestamp: Date.now()
      });

      return indicators;
    } catch (error) {
      console.error('Erreur récupération indicateurs:', error);
      return this.getFallbackIndicators(sector);
    }
  }

  // Agrégation des indicateurs
  aggregateIndicators(insee, bf, eurostat) {
    return {
      gdpGrowth: insee.gdpGrowth || 2.1,
      inflation: bf.inflation || 3.2,
      unemployment: insee.unemployment || 7.4,
      businessConfidence: bf.businessConfidence || 98,
      sectorGrowth: insee.sectorGrowth || 4.5,
      interestRates: bf.interestRates || 4.25,
      exchangeRates: eurostat.exchangeRates || { USD: 1.08, GBP: 0.86 },
      lastUpdate: new Date().toISOString(),
      sources: ['INSEE', 'Banque de France', 'Eurostat']
    };
  }

  getFallbackIndicators(sector) {
    return {
      gdpGrowth: 2.1,
      inflation: 3.2,
      unemployment: 7.4,
      businessConfidence: 98,
      sectorGrowth: 4.5,
      interestRates: 4.25,
      exchangeRates: { USD: 1.08, GBP: 0.86 },
      lastUpdate: new Date().toISOString(),
      sources: ['Cache local']
    };
  }
}

// Connecteurs de données économiques
class INSEEConnector {
  async getIndicators(sector, region) {
    // Simulation API INSEE
    return {
      gdpGrowth: 2.1,
      unemployment: 7.4,
      sectorGrowth: 4.5
    };
  }
}

class BanqueFranceConnector {
  async getIndicators(sector) {
    // Simulation API Banque de France
    return {
      inflation: 3.2,
      businessConfidence: 98,
      interestRates: 4.25
    };
  }
}

class EurostatConnector {
  async getIndicators(sector, region) {
    // Simulation API Eurostat
    return {
      exchangeRates: { USD: 1.08, GBP: 0.86 }
    };
  }
}

// Export des services
export { 
  NotificationService, 
  AccountingIntegrationService, 
  EconomicWatchService 
};

