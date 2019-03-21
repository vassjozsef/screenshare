
var stream = null;

function startCapture() {
  if (navigator.getDisplayMedia) {
      return navigator.getDisplayMedia({video: true});
    } else if (navigator.mediaDevices.getDisplayMedia) {
      return navigator.mediaDevices.getDisplayMedia({video: true});
    } else {
      return Promise.reject(new Error('NOT_SUPPORTED'));
  }
}

async function start(){
  try {
    newStream = await startCapture();
    stop();
    stream = newStream;
    stream.getTracks().forEach(track => {
      console.info(`Start sharing screen with track: ${track.id} with label: ${track.label}`);
      track.onended = () => { console.info(`Screen sharing ended with track: ${track.id}`); }
    });
    videoElement = document.getElementById('videoElement');
    videoElement.srcObject = stream;
  
  } catch (error) {
    console.info(`Failed to get screen: ${error}`);
  }
}

function stop() {
  if (stream != null) {
    stream.getTracks().forEach(track => {
      console.info(`Stop sharing screen with track: ${track.id}`);
      track.stop();
    });
    stream = null;
  }
}
