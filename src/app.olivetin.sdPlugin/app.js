/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />

const startAction = new Action('app.olivetin.actions.start'); 

$SD.onConnected(({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
	console.log('Stream Deck connected! 9');
	console.log("sa", startAction)    
}); 

startAction.onKeyUp(({ action, context, device, event, payload }) => {
	console.log(action)

	const settings = payload.settings

	const startActionArgs = {
		actionId: settings.action_id,
		arguments: []
	} 

	console.log("sa args", startActionArgs)

	fetch(settings.url + 'StartAction', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(startActionArgs)
	}).then(res => {
		if (res.ok) {
			return res.json()
		} else {
			console.log("then err", res)
			throw new Error(res)
		}
	}).catch(err => {
		throw err
	})
}); 

const killAction = new Action("app.olivetin.actions.kill")

killAction.onKeyUp(() => {
	console.log("Kill")  
});