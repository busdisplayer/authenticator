// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('Service Worker enregistré avec succès :', registration);
    })
    .catch(error => {
      console.error('Échec de l\'enregistrement du Service Worker :', error);
    });
}

// Fonction pour demander la permission et afficher une notification
document.getElementById('notify-btn').addEventListener('click', () => {
  // Demander la permission d'afficher des notifications
  if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        sendNotification();
      } else {
        alert('Permission refusée pour les notifications.');
      }
    });
  } else if (Notification.permission === 'granted') {
    sendNotification();
  } else {
    alert('Les notifications sont bloquées.');
  }
});

// Fonction pour envoyer une notification
function sendNotification() {
  navigator.serviceWorker.ready.then(registration => {
    registration.showNotification('Notification de test', {
      body: 'Ceci est un exemple de notification depuis une page GitHub.',
      icon: 'https://via.placeholder.com/128', // URL de l'icône de la notification
      vibrate: [200, 100, 200], // Vibration pour les appareils mobiles
      tag: 'test-notification', // Identifiant unique pour éviter les doublons
    });
  });
}
