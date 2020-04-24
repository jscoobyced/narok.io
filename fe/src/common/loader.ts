const myWindow = (<any>window);

export default class Loader {
  load = (root: HTMLDocument,
    elementId: string,
    scriptSource: string,
    dispatchEvent?: string,
    onload?: string) => {
    // Create script element
    const firstScriptElement = root.getElementsByTagName('script')[0];
    const scriptElement = root.createElement('script');
    scriptElement.id = elementId;
    scriptElement.src = scriptSource;

    // Configure event to be dispatched
    if (dispatchEvent && dispatchEvent.length > 0 && !onload) {
      scriptElement.onload = () => {
        myWindow.dispatchEvent(new Event(dispatchEvent));
      };
    }

    // Attach a window function to dispatch the event:
    // If script URL has a callback method name, it will call it,
    // so we create it here.
    myWindow[onload] = () => {
      myWindow.dispatchEvent(new Event(dispatchEvent));
    };

    // Finally add to the page to start loading
    if (firstScriptElement && firstScriptElement.parentNode) {
      firstScriptElement.parentNode.insertBefore(scriptElement, firstScriptElement);
    } else {
      document.head.appendChild(scriptElement);
    }
  }

  registerEvent = (eventName: string, callback: () => any) => {
    if (!eventName || eventName.length <= 0) return;
    if (typeof myWindow.addEventListener !== 'undefined') {
      myWindow.addEventListener(eventName, callback, false);
    } else if (typeof document.addEventListener !== 'undefined') {
      document.addEventListener(eventName, callback, false);
    } else if (typeof myWindow.attachEvent !== 'undefined') {
      myWindow.attachEvent(eventName, callback);
    }
  }
}
