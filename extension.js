const vscode = require('vscode');

function obtenerFecha() {

	const hoy = new Date();

	const dia = String(hoy.getDate()).padStart(2, '0');
	const mes = String(hoy.getMonth() + 1).padStart(2, '0');
	const anno = hoy.getFullYear();

	return dia + '-' + mes + '-' + anno;
}

function insertarTag(tipo) {

	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		return;
	}

	const configuracion = vscode.workspace.getConfiguration('desis-tag');

	const nombre = configuracion.get('nombre');
	const requerimiento = configuracion.get('requerimiento');

	if (!/^\d+$/.test(requerimiento)) {

		vscode.window.showErrorMessage(
			'El requerimiento debe contener solo numeros'
		);

		return;
	}

	const fecha = obtenerFecha();

	let texto = '';

	if (tipo === 'html') {

		texto =
			`<!--POR ${nombre} EN FECHA ${fecha}. MOTIVO: REQUERIMIENTO ${requerimiento}-->
<!--FIN REQUERIMIENTO ${requerimiento}-->`;

	} else if (tipo === 'sql') {

		texto =
			`--POR ${nombre} EN FECHA ${fecha}. MOTIVO: REQUERIMIENTO ${requerimiento}
--FIN REQUERIMIENTO ${requerimiento}`;

	} else {

		texto =
			`/*POR ${nombre} EN FECHA ${fecha}. MOTIVO: REQUERIMIENTO ${requerimiento}*/
/*FIN REQUERIMIENTO ${requerimiento}*/`;

	}

	editor.insertSnippet(
		new vscode.SnippetString(texto)
	);
}

function activate(context) {

	let tagHTML = vscode.commands.registerCommand(
		'desis-tag.tagHTML',
		function () {
			insertarTag('html');
		}
	);

	let tagPHP = vscode.commands.registerCommand(
		'desis-tag.tagPHP',
		function () {
			insertarTag('php');
		}
	);

	let tagCSS = vscode.commands.registerCommand(
		'desis-tag.tagCSS',
		function () {
			insertarTag('css');
		}
	);

	let tagJS = vscode.commands.registerCommand(
		'desis-tag.tagJS',
		function () {
			insertarTag('js');
		}
	);

	let tagSQL = vscode.commands.registerCommand(
		'desis-tag.tagSQL',
		function () {
			insertarTag('sql');
		}
	);

	context.subscriptions.push(tagHTML);
	context.subscriptions.push(tagPHP);
	context.subscriptions.push(tagCSS);
	context.subscriptions.push(tagJS);
	context.subscriptions.push(tagSQL);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};