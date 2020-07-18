import { User } from "../models/Users";
import { Firebase } from "../utils/Firebase";
import { Format } from "../utils/Format";
import { CameraController } from "./CameraController";
import { DocumentPreviewController } from "./DocumentPreviewController";
import { MicrophoneController } from "./MicrophoneController";
import { Chat } from "../models/Chat";

export class WhatsAppController {
  constructor() {
    /** */
    this.timeout = 50;

    this._firebase = new Firebase();
    this.initAuth();
    this.elementsPrototype();
    this.loadElements();
    this.initEvents();
  }

  /** */
  initAuth() {
    this._firebase.initAuth().then(result => {

      this._user = new User(result.user.email); // TODO this._user.email retorna undefined.
      this._meEmail = result.user.email;

      this._user.on('datachange', data => {

        document.querySelector("title").innerHTML = data.name + " - WhatsApp Clone";

        this.el.inputNamePanelEditProfile.innerHTML = data.name;

        if (data.photo) {
          let photo = this.el.imgPanelEditProfile;
          photo.src = data.photo;
          photo.show();
          this.el.imgDefaultPanelEditProfile.hide();

          let photo2 = this.el.myPhoto.querySelector("img");
          photo2.src = data.photo;
          photo2.show();
        }

        this.initContacts();

      });

      this._user.name = result.user.displayName;
      this._user.email = result.user.email;
      this._user.photo = result.user.photoURL;

      this._user.save().then(() => {

        this.el.appContent.css({
          display: "flex",
        });

      }).catch((error) => {

        console.error(error);

      });
    })
      .catch(error => {
        console.error(error);
      });
  }

  /** */
  elementsPrototype() {
    /**
         * Função para ocultar um elemento.
         * hide()
         */
    Element.prototype.hide = function () {
      this.style.display = "none";
      return this;
    };

    /**
         * Função para exibir um elemento.
         * show()
         */
    Element.prototype.show = function () {
      this.style.display = "block";
      return this;
    };

    /**
         * Função para ocultar/exibir um elemento.
         * toggle()
         */
    Element.prototype.toggle = function () {
      this.style.display = this.style.display === "none" ? "block" : "none";
      return this;
    };

    /**
         * Função para disparar multiplus events.
         * on()
         */
    Element.prototype.on = function (events, callback) {
      events.split(" ").forEach(event => {
        this.addEventListener(event, callback);
      });
      return this;
    };

    /**
         * Função para controlar o css.
         * css()
         */
    Element.prototype.css = function (styles) {
      for (let name in styles) {
        this.style[name] = styles[name];
      }
      return this;
    };

    /**
         * Função para adicionar class ao elemento.
         * addClass()
         */
    Element.prototype.addClass = function (name) {
      this.classList.add(name);
      return this;
    };

    /**
         * Função para adicionar class do elemento.
         * removeClass()
         */
    Element.prototype.removeClass = function (name) {
      this.classList.remove(name);
      return this;
    };

    /**
         * Função para adicionar/remover class ao elemento.
         * toggleClass()
         */
    Element.prototype.toggleClass = function (name) {
      this.classList.toggle(name);
      return this;
    };

    /**
         * Função para verificar se existe a class no elemento.
         * hasClass()
         */
    Element.prototype.hasClass = function (name) {
      return this.classList.contains(name);
    };

    /**
         * Função para retornar um new FormData com o this.
         * getForm()
         */
    HTMLFormElement.prototype.getForm = function () {
      return new FormData(this);
    };

    /**
         * Função para retornar um JSON com o this.
         * toJSON()
         */
    HTMLFormElement.prototype.toJSON = function () {
      let json = {};
      this.getForm().forEach((value, key) => (json[key] = value));
      return json;
    };
  }

  /** */
  initContacts() {

    let div = document.createElement('div');

    div.className = 'contact-item';

    div.innerHTML = `
    <div class="dIyEr">
        <div class="_1WliW" style="height: 49px; width: 49px;">
            <img src="#" class="Qgzj8 gqwaM photo" style="display:none;">
            <div class="_3ZW2E">
                <span data-icon="default-user" class="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                        <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z">
                        </path>
                        <g fill="#FFF">
                            <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
                            </path>
                        </g>
                    </svg>
                </span>
            </div>
        </div>
    </div>
    <div class="_3j7s9">
        <div class="_2FBdJ">
            <div class="_25Ooe">
                <span dir="auto" title="Nome do Contato" class="_1wjpf">Nome
                    do Contato</span>
            </div>
            <div class="_3Bxar">
                <span class="_3T2VG">18:03</span>
            </div>
        </div>
        <div class="_1AwDx">
            <div class="_itDl">
                <span title="digitando…" class="vdXUe _1wjpf typing" style="display:none">digitando…</span>

                <span class="_2_LEW last-message">
                    <div class="_1VfKB">
                        <span data-icon="status-dblcheck" class="">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                                <path fill="#263238" fill-opacity=".4" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z">
                                </path>
                            </svg>
                        </span>
                    </div>
                    <span dir="ltr" class="_1wjpf _3NFp9">Ok</span>
                    <div class="_3Bxar">
                        <span>
                            <div class="_15G96">
                                <span class="OUeyt messages-count-new" style="display:none;">1</span>
                            </div>
                    </span></div>
                </span>
            </div>
        </div>
    </div>
    `;

    this._user.on('contactschange', (docs) => {

      this.el.contactsMessagesList.innerHTML = '';

      docs.forEach((doc) => {

        let contact = doc.data();
        let div = document.createElement('div');

        div.className = 'contact-item';

        div.innerHTML = `
        <div class="dIyEr">
            <div class="_1WliW" style="height: 49px; width: 49px;">
                <img src="#" class="Qgzj8 gqwaM photo" style="display:none;">
                <div class="_3ZW2E">
                    <span data-icon="default-user" class="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                            <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z">
                            </path>
                            <g fill="#FFF">
                                <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
                                </path>
                            </g>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
        <div class="_3j7s9">
            <div class="_2FBdJ">
                <div class="_25Ooe">
                    <span dir="auto" title="${contact.name}" class="_1wjpf">${contact.name}</span>
                </div>
                <div class="_3Bxar">
                    <span class="_3T2VG">${contact.lastMessageTime}</span>
                </div>
            </div>
            <div class="_1AwDx">
                <div class="_itDl">
                    <span title="digitando…" class="vdXUe _1wjpf typing" style="display:none">digitando…</span>

                    <span class="_2_LEW last-message">
                        <div class="_1VfKB">
                            <span data-icon="status-dblcheck" class="">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                                    <path fill="#263238" fill-opacity=".4" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z">
                                    </path>
                                </svg>
                            </span>
                        </div>
                        <span dir="ltr" class="_1wjpf _3NFp9">${contact.lastMessage}</span>
                        <div class="_3Bxar">
                            <span>
                                <div class="_15G96">
                                    <span class="OUeyt messages-count-new" style="display:none;">1</span>
                                </div>
                        </span></div>
                    </span>
                </div>
            </div>
        </div>
        `;

        if (contact.photo) {

          let img = div.querySelector('.photo');
          img.src = contact.photo;
          img.show();

        }

        div.on('click', (event) => {

          this.el.activeName.innerHTML = contact.name;
          this.el.activeStatus.innerHTML = contact.status;

          if (contact.photo) {

            let img = this.el.activePhoto;
            img.src = contact.photo;
            img.show();

            this.el.home.hide();
            this.el.main.css({ display: 'flex' });
          }

        });

        this.el.contactsMessagesList.appendChild(div);

      });

    });

    this._user.getContacts();

  }

  /** */
  loadElements() {
    this.el = {};

    document.querySelectorAll("[id]").forEach(element => {
      this.el[Format.getCamelCase(element.id)] = element;
    });
  }

  /** */
  initEvents() {
    /** OPEN EDIT PROFILE */
    this.el.myPhoto.on("click", () => {
      this.closeAllLeftPanel();
      this.el.panelEditProfile.show();
      setTimeout(() => this.el.panelEditProfile.addClass("open"), this.timeout);
    });

    /** CLOSE PANEL EDIT PROFILE */
    this.el.btnClosePanelEditProfile.on("click", () => {
      this.el.panelEditProfile.removeClass("open");
    });

    /** */
    this.el.photoContainerEditProfile.on("click", () => {
      this.el.inputProfilePhoto.click();
    });

    /** */
    this.el.inputNamePanelEditProfile.on("keypress", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.el.btnSavePanelEditProfile.click();
      }
    });

    /** */
    this.el.btnSavePanelEditProfile.on("click", () => {

      this.el.btnSavePanelEditProfile.disabled = true;

      this._user.name = this.el.inputNamePanelEditProfile.innerHTML;
      this._user.save().then(() => {
        this.el.btnSavePanelEditProfile.disabled = false;
      });
    });

    /** OPEN ADD CONTACT PANEL */
    this.el.btnNewContact.on("click", () => {
      this.closeAllLeftPanel();
      this.el.panelAddContact.show();
      setTimeout(() => this.el.panelAddContact.addClass("open"), this.timeout);
    });

    /** CLOSE ADD PANEL CONTACT */
    this.el.btnClosePanelAddContact.on("click", () => {
      this.el.panelAddContact.removeClass("open");
    });

    /** */
    this.el.formPanelAddContact.on("submit", event => {

      event.preventDefault();

      let formData = new FormData(this.el.formPanelAddContact); // verificar

      let contact = new User(formData.get('email'));

      contact.on('datachange', (data) => {

        if (data.name) {

          Chat.createIfNotExists(this._meEmail, contact.email).then((chat) => {

            contact.chatId = chat.id;

            this._user.chatId = chat.id;

            contact.addContact(this._user);

            this._user.addContact(contact).then(() => {

              this.el.btnClosePanelAddContact.click();
              console.info('Contato adicionado!');

            });

          }).catch();

        } else {
          console.error('Usuário não localizado!');
        }
      });

    });

    /** */
    this.el.contactsMessagesList
      .querySelectorAll(".contact-item")
      .forEach(contact => {
        contact.on("click", () => {
          this.el.home.hide();
          this.el.main.css({ display: "flex" });
        });
      });

    /** */
    this.el.btnAttach.on("click", event => {
      /** Para a propagação de eventos */
      event.stopPropagation();

      this.el.menuAttach.addClass("open");
      document.addEventListener("click", this.closeMenuAttach.bind(this));
    });

    /** */
    this.el.btnAttachPhoto.on("click", () => {
      this.el.inputPhoto.click();
    });

    /** */
    this.el.inputPhoto.on("change", () => {
      [...this.el.inputPhoto.files].forEach(file => {
        console.log(file);
      });
    });

    /** */
    this.el.btnAttachCamera.on("click", () => {
      this.closeAllMainPanel();
      this.el.panelCamera.addClass("open");
      this.el.panelCamera.css({ height: "calc(100% - 0px)" });

      this._camera = new CameraController(this.el.videoCamera);
    });

    /** */
    this.el.btnClosePanelCamera.on("click", () => {
      this.closeAllMainPanel();
      this.el.panelMessagesContainer.show();
      this._camera.stop();
    });

    /** */
    this.el.btnTakePicture.on("click", () => {
      let dataUrl = this._camera.tackPicture();

      this.el.pictureCamera.src = dataUrl;
      this.el.pictureCamera.show();
      this.el.videoCamera.hide();
      this.el.btnReshootPanelCamera.show();
      this.el.containerTakePicture.hide();
      this.el.containerSendPicture.show();
    });

    /** */
    this.el.btnReshootPanelCamera.on("click", () => {
      this.el.pictureCamera.hide();
      this.el.videoCamera.show();
      this.el.btnReshootPanelCamera.hide();
      this.el.containerTakePicture.show();
      this.el.containerSendPicture.hide();
    });

    /** */
    this.el.btnSendPicture.on("click", () => {
      console.log(this.el.pictureCamera.src);
    });

    /** */
    this.el.btnAttachDocument.on("click", () => {
      this.closeAllMainPanel();
      this.el.panelDocumentPreview.addClass("open");
      this.el.panelDocumentPreview.css({ height: "calc(100% - 0px)" });
      this.el.inputDocument.click();
    });

    /** */
    this.el.inputDocument.on("change", event => {
      if (this.el.inputDocument.files.length) {
        let file = this.el.inputDocument.files[0];

        this._documentPreviewController = new DocumentPreviewController(file);

        this._documentPreviewController
          .getPreviewData()
          .then(data => {
            this.el.imgPanelDocumentPreview.src = data.src;
            this.el.infoPanelDocumentPreview.innerHTML = data.info;
            this.el.imagePanelDocumentPreview.show();
            this.el.filePanelDocumentPreview.hide();
          })
          .catch(() => {
            switch (file.type) {
              case "application/msword":
              case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                this.el.iconPanelDocumentPreview.classList.value =
                  "jcxhw icon-doc-doc";
                break;

              case "application/vnd.ms-excel":
              case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                this.el.iconPanelDocumentPreview.classList.value =
                  "jcxhw icon-doc-xls";
                break;

              case "application/vnd.ms-powerpoint":
              case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                this.el.iconPanelDocumentPreview.classList.value =
                  "jcxhw icon-doc-ppt";
                break;

              default:
                this.el.iconPanelDocumentPreview.classList.value =
                  "jcxhw icon-doc-generic";
            }

            this.el.filenamePanelDocumentPreview.innerHTML = file.name;
            this.el.filePanelDocumentPreview.show();
            this.el.imagePanelDocumentPreview.hide();
          });
      }
    });

    /** */
    this.el.btnClosePanelDocumentPreview.on("click", () => {
      this.closeAllMainPanel();
      this.el.imagePanelDocumentPreview.hide();
      this.el.panelMessagesContainer.show();
    });

    /** */
    this.el.btnSendDocument.on("click", () => {
      console.log("send document");
    });

    /** */
    this.el.btnAttachContact.on("click", () => {
      this.el.modalContacts.show();
    });

    /** */
    this.el.btnCloseModalContacts.on("click", () => {
      this.el.modalContacts.hide();
    });

    /** */
    this.el.btnSendMicrophone.on("click", () => {
      this.el.recordMicrophone.show();
      this.el.btnSendMicrophone.hide();

      this._microphoneController = new MicrophoneController();

      this._microphoneController.on("ready", audio => {
        console.log("event ready");
        this._microphoneController.startRecord();
      });

      this._microphoneController.on("recordtimer", timer => {
        this.el.recordMicrophoneTimer.innerHTML = Format.toTime(timer);
      });
    });

    /** */
    this.el.btnCancelMicrophone.on("click", () => {
      this._microphoneController.stopRecord();
      this.closeRecordMicrophone();
    });

    /** */
    this.el.btnFinishMicrophone.on("click", () => {
      this._microphoneController.stopRecord();
      this.closeRecordMicrophone();
    });

    /** */
    this.el.inputText.on("keypress", event => {
      if (event.key === "Enter" && !event.ctrlKey) {
        event.preventDefault();
        this.el.btnSend.click();
        /** */
        this.el.inputText.innerHTML = "";
      }
    });

    /** */
    this.el.inputText.on("keyup", event => {
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
    this.el.btnSend.on("click", () => {
      console.log(this.el.inputText.innerHTML);
    });

    /** */
    this.el.btnEmojis.on("click", () => {
      this.el.panelEmojis.toggleClass("open");
    });

    /** */
    this.el.panelEmojis.querySelectorAll(".emojik").forEach(emoji => {
      emoji.on("click", () => {
        let img = this.el.imgEmojiDefault.cloneNode();

        img.style.cssText = emoji.style.cssText;
        img.dataset.unicode = emoji.dataset.unicode;
        img.alt = emoji.dataset.unicode;

        /** */
        emoji.classList.forEach(name => img.classList.add(name));

        /** */
        let position = window.getSelection();

        if (!position.focusNode || !position.focusNode.id == "input-text") {
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
        this.el.inputText.dispatchEvent(new Event("keyup"));
      });
    });
  }

  /** */
  closeRecordMicrophone() {
    this.el.recordMicrophone.hide();
    this.el.btnSendMicrophone.show();
  }

  /** */
  closeAllMainPanel() {
    this.el.panelMessagesContainer.hide();
    this.el.panelCamera.removeClass("open");
    this.el.panelDocumentPreview.removeClass("open");
  }

  /** */
  closeMenuAttach() {
    document.removeEventListener("click", this.closeMenuAttach);
    this.el.menuAttach.removeClass("open");
  }

  /** */
  closeAllLeftPanel() {
    this.el.panelAddContact.hide();
    this.el.panelEditProfile.hide();
  }
}
