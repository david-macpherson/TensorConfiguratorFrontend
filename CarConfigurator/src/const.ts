// For SPS version 0.10.2 and below the websocket address required to connect had a suffix of /ws added to the end of the path
// eg ws://<hostname>/<application name>/ws 
// For SPS versions above 0.10.2 the websocket address was changed to connect to /signalling and then the pathname was added
// eg ws://<hostname>/signalling/<application name>
// Set this to true if building for use on SPS versions v0.10.2 or below
export var SPS_LEGACY_SIGNALLING_PATH_WS: boolean = false;


