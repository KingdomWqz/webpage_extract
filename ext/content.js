let captureDiv = null;

const capture_mousedown = (e) => {
    const div = document.createElement('DIV');
    div.style.position = 'absolute';
    div.style.border = 'solid 3px red';
    div.style.zIndex = '999';
    div.style.top = `${e.clientY}px`;
    div.style.left = `${e.clientX}px`;

    captureDiv = div;
    document.body.append(div);
    document.body.addEventListener('mousemove', capture_mousemove);
    document.body.addEventListener('mouseup', capture_mouseup);
};

const capture_mousemove = (e) => {
    captureDiv.style.width = `${e.clientX - parseInt(captureDiv.style.left.replace('px', ''))}px`;
    captureDiv.style.height = `${e.clientY - parseInt(captureDiv.style.top.replace('px', ''))}px`;
};

const capture_mouseup = (e) => {
    document.body.removeEventListener('mousemove', capture_mousemove);
    document.body.removeEventListener('mouseup', capture_mouseup);
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "capture") {
            document.body.addEventListener('mousedown', capture_mousedown);
        }
    }
);