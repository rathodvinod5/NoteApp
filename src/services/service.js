const syncWithServer = async (notes) => {
    try {
        console.log('in syncWithServer');
      // Replace with your server API call
    //   const response = await fetch('https://your-server-api.com/sync', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ notes }),
    //   });
  
    //   if (!response.ok) {
    //     throw new Error('Failed to sync with server');
    //   }
  
    //   const result = await response.json();
    //   console.log('Sync result:', result);
    } catch (error) {
      console.error('Error syncing with server:', error);
    }
  };

  export default syncWithServer;