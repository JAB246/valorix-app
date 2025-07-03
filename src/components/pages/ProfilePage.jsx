import React, { useState } from 'react';
import {
  User, Building, Mail, Phone, Calendar, MapPin, 
  Edit, Save, Camera, Shield, Award, Star,
  CheckCircle2, TrendingUp, BarChart3, Target,
  Settings, Bell, Globe, Lock, Info, X
} from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@techstart.fr',
    phone: '+33 6 12 34 56 78',
    company: 'TechStart SAS',
    position: 'Directeur Général',
    industry: 'Technologies',
    address: '42 Avenue des Champs-Élysées, 75008 Paris',
    bio: 'Entrepreneur passionné avec 15 ans d\'expérience dans le secteur tech.',
    website: 'www.techstart.fr',
    linkedIn: 'linkedin.com/in/jeandupont',
    joinDate: '2024-01-15'
  });

  const achievements = [
    { id: 1, title: 'Première Évaluation', description: 'Score Valorix initial', icon: Star, date: '2024-01-15' },
    { id: 2, title: 'Expert Validé', description: 'Profil entreprise vérifié', icon: Shield, date: '2024-02-01' },
    { id: 3, title: 'Top Performer', description: 'Score > 90', icon: Award, date: '2024-03-15' },
    { id: 4, title: 'Croissance Forte', description: '+25% en 6 mois', icon: TrendingUp, date: '2024-05-10' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Logique de sauvegarde
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white text-indigo-600 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{userProfile.firstName} {userProfile.lastName}</h1>
            <p className="text-indigo-100 text-lg">{userProfile.position}</p>
            <p className="text-indigo-200">{userProfile.company}</p>
            <div className="flex items-center mt-2 text-indigo-200">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Membre depuis {new Date(userProfile.joinDate).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {isEditing ? 'Sauvegarder' : 'Modifier'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informations Principales */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations Personnelles */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations Personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userProfile.firstName}
                    onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{userProfile.firstName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userProfile.lastName}
                    onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{userProfile.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{userProfile.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-400 mr-2" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{userProfile.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Informations Entreprise */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Entreprise</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                  <div className="flex items-center">
                    <Building className="w-4 h-4 text-gray-400 mr-2" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={userProfile.company}
                        onChange={(e) => setUserProfile({...userProfile, company: e.target.value})}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{userProfile.company}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Poste</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userProfile.position}
                      onChange={(e) => setUserProfile({...userProfile, position: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{userProfile.position}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                  {isEditing ? (
                    <textarea
                      value={userProfile.address}
                      onChange={(e) => setUserProfile({...userProfile, address: e.target.value})}
                      rows={2}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{userProfile.address}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={userProfile.bio}
                    onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{userProfile.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Score Valorix */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Valorix</h3>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-indigo-600">92/100</div>
              <div className="text-sm text-gray-600">Excellent</div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Financier</span>
                <span className="font-medium">95/100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Opérationnel</span>
                <span className="font-medium">88/100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Stratégique</span>
                <span className="font-medium">93/100</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Réalisations</h3>
            <div className="space-y-3">
              {achievements.map(achievement => {
                const IconComponent = achievement.icon;
                return (
                  <div key={achievement.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{achievement.title}</div>
                      <div className="text-xs text-gray-600">{achievement.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions Rapides */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <Settings className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-700">Paramètres</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <Bell className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-700">Notifications</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <Lock className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-700">Sécurité</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Boutons d'action */}
      {isEditing && (
        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2 inline" />
            Sauvegarder les modifications
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4 mr-2 inline" />
            Annuler
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

