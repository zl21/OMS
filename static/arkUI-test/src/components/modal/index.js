import Modal from './confirm';

let modalInstance;

function getModalInstance (render = undefined) {
    modalInstance = modalInstance || Modal.newInstance({
        closable: false,
        maskClosable: false,
        footerHide: true,
        render: render
    });

    return modalInstance;
}

function confirm (options) {
    const render = 'render' in options ? options.render : undefined;
    let instance = getModalInstance(render);

    options.onRemove = function () {
        modalInstance = null;
    };

    instance.show(options);
}

Modal.info = function (props = {}) {
    props.icon = 'info';
    props.showCancel = props.showCancel?props.showCancel:false;
    setTimeout(() => confirm(props),150);

};

Modal.success = function (props = {}) {
    props.icon = 'success';
    props.showCancel = props.showCancel?props.showCancel:false;
    setTimeout(() => confirm(props),150);
};

Modal.warning = function (props = {}) {
    props.icon = 'warning';
    props.showCancel = props.showCancel?props.showCancel:false;
    setTimeout(() => confirm(props),150);
};

Modal.error = function (props = {}) {
    props.icon = 'error';
    props.showCancel = props.showCancel?props.showCancel:false;
    setTimeout(() => confirm(props),150);
};

Modal.confirm = function (props = {}) {
    props.icon = 'confirm';
    props.showCancel = props.showCancel?props.showCancel:false;
    setTimeout(() => confirm(props),150);
};

Modal.fcSuccess = function (props = {}) {
    props.icon = 'fcSuccess';
    props.showCancel = props.showCancel?props.showCancel:false;
    props.width = 380;
    props.draggable = false;
    props.closable = true;
    setTimeout(() => confirm(props),150);
};
Modal.fcError = function (props = {}) {
    props.icon = 'fcError';
    props.showCancel = props.showCancel?props.showCancel:false;
    props.width = 380;
    props.draggable = false;
    props.closable = true;
    setTimeout(() => confirm(props),150);
};
Modal.fcWarning = function (props = {}) {

    props.icon = 'fcWarning';
    props.showCancel = props.showCancel?props.showCancel:false;
    props.width = 380;
    props.draggable = false;
    props.closable = true;
    setTimeout(() => confirm(props),150);
};

Modal.posMessage = function (props = {}) {
    props.icon = 'posMessage';
    props.showCancel = props.showCancel?props.showCancel:false;
    setTimeout(() => confirm(props),150);
};

Modal.remove = function () {
    if (!modalInstance) { // at loading status, remove after Cancel
        return false;
    }

    const instance = getModalInstance();

    instance.remove();
};

export default Modal;
