import React, { useState } from 'react';
import {
  Settings, Bell, Shield, Globe, User, Key, Mail,
  Toggle, CheckCircle2, AlertTriangle, Save, Info,
  Moon, Sun, Monitor, Lock, Download, Upload,
  Trash2, Eye, EyeOff, Calendar, Clock
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // Général
    language: 'fr',
    timezone: 'Europe/Paris',
    theme: 'light',
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    reportNotifications: true,
    marketingEmails: false,
    // Sécurité
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 60,
    // Confidentialité
    dataSharing: false,
    analytics: true,
    profilePublic: false
  });

  const tabs = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'privacy', label: 'Confidentialité', icon: Lock },
    { id: 'data', label: 'Données', icon: Download }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Logique de sauvegarde
    console.log('Settings saved:', settings);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-1">Gérez vos préférences et configurations</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Général */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Préférences Générales</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Langue de l'interface
                    </label>
                    <select 
                      value={settings.language}
                      onChange={(e) => handleSettingChange('language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuseau horaire
                    </label>
                    <select 
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange('timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                      <option value="Europe/London">Europe/London (UTC+0)</option>
                      <option value="America/New_York">America/New_York (UTC-5)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thème de l'interface
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'light', label: 'Clair', icon: Sun },
                        { value: 'dark', label: 'Sombre', icon: Moon },
                        { value: 'auto', label: 'Auto', icon: Monitor }
                      ].map(theme => {
                        const IconComponent = theme.icon;
                        return (
                          <button
                            key={theme.value}
                            onClick={() => handleSettingChange('theme', theme.value)}
                            className={`p-3 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                              settings.theme === theme.value
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                            <span className="text-sm">{theme.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Préférences de Notifications</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Notifications par email</h4>
                      <p className="text-sm text-gray-600">Recevez les notifications importantes par email</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Notifications push</h4>
                      <p className="text-sm text-gray-600">Notifications dans le navigateur</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.pushNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Rapports automatiques</h4>
                      <p className="text-sm text-gray-600">Notification à la génération de rapports</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('reportNotifications', !settings.reportNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.reportNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.reportNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Emails marketing</h4>
                      <p className="text-sm text-gray-600">Nouveautés et conseils business</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('marketingEmails', !settings.marketingEmails)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.marketingEmails ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sécurité */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres de Sécurité</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Authentification à deux facteurs</h4>
                      <p className="text-sm text-gray-600">Sécurisez votre compte avec la 2FA</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-sm ${settings.twoFactorAuth ? 'text-green-600' : 'text-gray-500'}`}>
                        {settings.twoFactorAuth ? 'Activée' : 'Désactivée'}
                      </span>
                      <button
                        onClick={() => handleSettingChange('twoFactorAuth', !settings.twoFactorAuth)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.twoFactorAuth ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Alertes de connexion</h4>
                      <p className="text-sm text-gray-600">Notification lors de nouvelles connexions</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('loginAlerts', !settings.loginAlerts)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.loginAlerts ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeout de session (minutes)
                    </label>
                    <select 
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 heure</option>
                      <option value={120}>2 heures</option>
                      <option value={480}>8 heures</option>
                    </select>
                  </div>

                  <div className="border-t pt-6">
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                        <div className="flex items-center">
                          <Key className="w-4 h-4 text-gray-400 mr-3" />
                          <span className="text-gray-700">Changer le mot de passe</span>
                        </div>
                      </button>
                      <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                        <div className="flex items-center">
                          <Download className="w-4 h-4 text-gray-400 mr-3" />
                          <span className="text-gray-700">Télécharger les données de sécurité</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Confidentialité */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres de Confidentialité</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Partage de données</h4>
                      <p className="text-sm text-gray-600">Autoriser le partage anonymisé pour l'amélioration du service</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('dataSharing', !settings.dataSharing)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.dataSharing ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.dataSharing ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Analytics et usage</h4>
                      <p className="text-sm text-gray-600">Collecte de données d'utilisation pour l'amélioration</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('analytics', !settings.analytics)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.analytics ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.analytics ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Profil public</h4>
                      <p className="text-sm text-gray-600">Rendre votre profil visible dans l'annuaire</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('profilePublic', !settings.profilePublic)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.profilePublic ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.profilePublic ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Données */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gestion des Données</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center mb-3">
                        <Download className="w-5 h-5 text-indigo-600 mr-2" />
                        <h4 className="font-medium text-gray-900">Exporter mes données</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Téléchargez toutes vos données au format JSON
                      </p>
                      <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        Télécharger
                      </button>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center mb-3">
                        <Upload className="w-5 h-5 text-green-600 mr-2" />
                        <h4 className="font-medium text-gray-900">Importer des données</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Importez vos données depuis un fichier
                      </p>
                      <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Importer
                      </button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-red-900 mb-2">Zone de danger</h4>
                          <p className="text-sm text-red-700 mb-4">
                            Les actions suivantes sont irréversibles. Procédez avec prudence.
                          </p>
                          <div className="space-y-2">
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                              <Trash2 className="w-4 h-4 mr-2 inline" />
                              Supprimer toutes les données
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bouton de sauvegarde */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Save className="w-4 h-4 mr-2 inline" />
          Sauvegarder les paramètres
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;

