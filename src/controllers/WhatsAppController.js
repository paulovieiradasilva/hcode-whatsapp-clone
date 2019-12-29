import { Format } from '../utils/Format';
import { CameraController } from './CameraController';
import { DocumentPreviewController } from './DocumentPreviewController';

export class WhatsAppController {

	constructor() {

		/** */
		this.timeout = 50

		this.elementsPrototype();
		this.loadElements();
		this.initEvents();

	}

	/** */
	elementsPrototype() {

		/**
         * Função para ocultar um elemento.
         * hide()
         */
		Element.prototype.hide = function () {
			this.style.display = 'none';
			return this;
		}

		/**
         * Função para exibir um elemento.
         * show()
         */
		Element.prototype.show = function () {
			this.style.display = 'block';
			return this;
		}

		/**
         * Função para ocultar/exibir um elemento.
         * toggle()
         */
		Element.prototype.toggle = function () {
			this.style.display = (this.style.display === 'none') ? 'block' : 'none';
			return this;
		}

		/**
         * Função para disparar multiplus events.
         * on()
         */
		Element.prototype.on = function (events, callback) {
			events.split(' ').forEach(event => {
				this.addEventListener(event, callback);
			});
			return this;
		}

		/**
         * Função para controlar o css.
         * css()
         */
		Element.prototype.css = function (styles) {
			for (let name in styles) {
				this.style[name] = styles[name];
			}
			return this;
		}

		/**
         * Função para adicionar class ao elemento.
         * addClass()
         */
		Element.prototype.addClass = function (name) {
			this.classList.add(name);
			return this;
		}

		/**
         * Função para adicionar class do elemento.
         * removeClass()
         */
		Element.prototype.removeClass = function (name) {
			this.classList.remove(name);
			return this;
		}

		/**
         * Função para adicionar/remover class ao elemento.
         * toggleClass()
         */
		Element.prototype.toggleClass = function (name) {
			this.classList.toggle(name);
			return this;
		}

		/**
         * Função para verificar se existe a class no elemento.
         * hasClass()
         */
		Element.prototype.hasClass = function (name) {
			return this.classList.contains(name);
		}

		/**
         * Função para retornar um new FormData com o this.
         * getForm()
         */
		HTMLFormElement.prototype.getForm = function () {
			return new FormData(this);
		}

		/**
         * Função para retornar um JSON com o this.
         * toJSON()
         */
		HTMLFormElement.prototype.toJSON = function () {
			let json = {};
			this.getForm().forEach((value, key) => json[key] = value);
			return json;
		}

	}

	/** */
	loadElements() {

		this.el = {}

		document.querySelectorAll('[id]').forEach((element) => {
			this.el[Format.getCamelCase(element.id)] = element;
		});
	}

	/** */
	initEvents() {

		/** OPEN EDIT PROFILE */
		this.el.myPhoto.on('click', () => {

			this.closeAllLeftPanel();
			this.el.panelEditProfile.show();
			setTimeout(() => this.el.panelEditProfile.addClass('open'), this.timeout);

		});

		/** CLOSE PANEL EDIT PROFILE */
		this.el.btnClosePanelEditProfile.on('click', () => {
			this.el.panelEditProfile.removeClass('open');
		});

		/** */
		this.el.photoContainerEditProfile.on('click', () => {
			this.el.inputProfilePhoto.click();
		});

		/** */
		this.el.inputNamePanelEditProfile.on('keypress', (event) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				this.el.btnSavePanelEditProfile.click();
			}

		});

		/** */
		this.el.btnSavePanelEditProfile.on('click', () => {
			console.log(this.el.inputNamePanelEditProfile.innerHTML);
		});

		/** OPEN ADD CONTACT PANEL */
		this.el.btnNewContact.on('click', () => {

			this.closeAllLeftPanel();
			this.el.panelAddContact.show();
			setTimeout(() => this.el.panelAddContact.addClass('open'), this.timeout);

		});

		/** CLOSE ADD PANEL CONTACT */
		this.el.btnClosePanelAddContact.on('click', () => {
			this.el.panelAddContact.removeClass('open');
		});

		/** */
		this.el.formPanelAddContact.on('submit', (event) => {
			event.preventDefault();

			formData = new FormData(this.el.formPanelAddContact); // verificar 

		});

		/** */
		this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach((contact) => {
			contact.on('click', () => {
				this.el.home.hide();
				this.el.main.css({ display: 'flex' });
			});
		});

		/** */
		this.el.btnAttach.on('click', (event) => {

			/** Para a propagação de eventos */
			event.stopPropagation();

			this.el.menuAttach.addClass('open');
			document.addEventListener('click', this.closeMenuAttach.bind(this));
		});

		/** */
		this.el.btnAttachPhoto.on('click', () => {
			this.el.inputPhoto.click();
		});

		/** */
		this.el.inputPhoto.on('change', () => {

			[...this.el.inputPhoto.files].forEach(file => {

				console.log(file);

			});
		});

		/** */
		this.el.btnAttachCamera.on('click', () => {

			this.closeAllMainPanel();
			this.el.panelCamera.addClass('open');
			this.el.panelCamera.css({ height: 'calc(100% - 0px)' });

			this._camera = new CameraController(this.el.videoCamera);

		});

		/** */
		this.el.btnClosePanelCamera.on('click', () => {

			this.closeAllMainPanel();
			this.el.panelMessagesContainer.show();
			this._camera.stop();

		});

		/** */
		this.el.btnTakePicture.on('click', () => {

			let dataUrl = this._camera.tackPicture();

			this.el.pictureCamera.src = dataUrl;
			this.el.pictureCamera.show();
			this.el.videoCamera.hide();
			this.el.btnReshootPanelCamera.show();
			this.el.containerTakePicture.hide();
			this.el.containerSendPicture.show();

		});

		/** */
		this.el.btnReshootPanelCamera.on('click', () => {

			this.el.pictureCamera.hide();
			this.el.videoCamera.show();
			this.el.btnReshootPanelCamera.hide();
			this.el.containerTakePicture.show();
			this.el.containerSendPicture.hide();

		});

		/** */
		this.el.btnSendPicture.on('click', () => {

			console.log(this.el.pictureCamera.src);

		});

		/** */
		this.el.btnAttachDocument.on('click', () => {

			this.closeAllMainPanel();
			this.el.panelDocumentPreview.addClass('open');
			this.el.panelDocumentPreview.css({ height: 'calc(100% - 0px)' });
			this.el.inputDocument.click();

		});

		/** */
		this.el.inputDocument.on('change', (event) => {

			if (this.el.inputDocument.files.length) {

				//this.el.panelDocumentPreview.css({ height: '1%' });

				let file = this.el.inputDocument.files[0];

				this._documentPreviewController = new DocumentPreviewController(file);
				this._documentPreviewController.getPreviewData().then((data) => {

					this.el.imgPanelDocumentPreview.src = data.src;
					this.el.infoPanelDocumentPreview.innerHTML = data.info;
					this.el.imagePanelDocumentPreview.show();
					this.el.filePanelDocumentPreview.hide();

					//this.el.panelDocumentPreview.css({ height: 'calc(100% - 0px)' });

				}).catch((error) => {

					//this.el.panelDocumentPreview.css({ height: 'calc(100% - 0px)' });

					switch (file.type) {
						case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
						case 'application/msword':
							this.el.iconPanelDocumentPreview.classList.value = 'jcxhw icon-doc-doc';
							break;

						case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
						case 'application/vnd.ms-excel':
							this.el.iconPanelDocumentPreview.classList.value = 'jcxhw icon-doc-xls';
							break;

						case 'application/vnd.ms-powerpoint':
						case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
							this.el.iconPanelDocumentPreview.classList.value = 'jcxhw icon-doc-ppt';
							break;

						default:
							this.el.iconPanelDocumentPreview.classList.value = 'jcxhw icon-doc-generic';
					}

					this.el.filePanelDocumentPreview.show();
					this.el.imagePanelDocumentPreview.hide();

					this.el.filenamePanelDocumentPreview.innerHTML = file.name;

				});
			}
		});

		/** */
		this.el.btnClosePanelDocumentPreview.on('click', () => {

			this.closeAllMainPanel();
			this.el.imagePanelDocumentPreview.hide();
			this.el.panelMessagesContainer.show();

		});

		/** */
		this.el.btnSendDocument.on('click', () => {

			console.log('send document');

		});

		/** */
		this.el.btnAttachContact.on('click', () => {
			this.el.modalContacts.show();
		});

		/** */
		this.el.btnCloseModalContacts.on('click', () => {
			this.el.modalContacts.hide();
		});

		/** */
		this.el.btnSendMicrophone.on('click', () => {
			this.el.recordMicrophone.show();
			this.el.btnSendMicrophone.hide();
			this.startRecordMicrophoneTime();
		});

		/** */
		this.el.btnCancelMicrophone.on('click', () => {
			this.closeRecordMicrophone();
		});

		/** */
		this.el.btnFinishMicrophone.on('click', () => {
			this.closeRecordMicrophone();
		});

		/** */
		this.el.inputText.on('keypress', (event) => {

			if (event.key === 'Enter' && !event.ctrlKey) {

				event.preventDefault();
				this.el.btnSend.click();
				/** */
				this.el.inputText.innerHTML = '';

			}

		});

		/** */
		this.el.inputText.on('keyup', (event) => {
			if (this.el.inputText.innerHTML.length) {

				this.el.inputPlaceholder.hide();
				this.el.btnSendMicrophone.hide();
				this.el.btnSend.show();

			} else {

				this.el.inputPlaceholder.show();
				this.el.btnSendMicrophone.show();
				this.el.btnSend.hide();

			}
		});

		/** */
		this.el.btnSend.on('click', () => {

			console.log(this.el.inputText.innerHTML);

		});

		/** */
		this.el.btnEmojis.on('click', () => {

			this.el.panelEmojis.toggleClass('open');

		});

		/** */
		this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {

			emoji.on('click', () => {

				let img = this.el.imgEmojiDefault.cloneNode();

				img.style.cssText = emoji.style.cssText;
				img.dataset.unicode = emoji.dataset.unicode;
				img.alt = emoji.dataset.unicode;

				/** */
				emoji.classList.forEach(name => img.classList.add(name));

				/** */
				let position = window.getSelection();

				if (!position.focusNode || !position.focusNode.id == 'input-text') {
					this.inputText.focus();
					position = window.getSelection();
				}

				/** */
				let range = document.createRange();

				range = position.getRangeAt(0);
				range.deleteContents();

				/** */
				let fragment = document.createDocumentFragment();
				fragment.appendChild(img);

				/** */
				range.insertNode(fragment);

				/** */
				range.setStartAfter(img);

				/** */
				this.el.inputText.dispatchEvent(new Event('keyup'));

			});

		});

	}

	/** */
	startRecordMicrophoneTime() {
		let start = Date.now();
		this._recordMicrophpneInterval = setInterval(() => {
			this.el.recordMicrophoneTimer.innerHTML = Format.toTime((Date.now() - start));
		}, 100);
	}

	/** */
	closeRecordMicrophone() {
		this.el.recordMicrophone.hide();
		this.el.btnSendMicrophone.show();
		clearInterval(this._recordMicrophpneInterval);
	}

	/** */
	closeAllMainPanel() {
		this.el.panelMessagesContainer.hide();
		this.el.panelCamera.removeClass('open');
		this.el.panelDocumentPreview.removeClass('open');
	}

	/** */
	closeMenuAttach() {
		document.removeEventListener('click', this.closeMenuAttach)
		this.el.menuAttach.removeClass('open');
	}

	/** */
	closeAllLeftPanel() {
		this.el.panelAddContact.hide();
		this.el.panelEditProfile.hide();
	}

}