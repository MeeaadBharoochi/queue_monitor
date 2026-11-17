function search(root = document) {
    for (const el of root.querySelectorAll('*')) {
        if (el.getAttribute?.('component-name') === '_node0_list-refresh') {
            return el;
        }
        if (el.shadowRoot) {
            const found = search(el.shadowRoot);
            if (found) return found;
        }
    }
}

function refreshList() {
    const btn = search();
    btn?.shadowRoot?.querySelector('button')?.click();
}

let paused = false;

window.refreshTimer = setInterval(() => {
    if (!paused) {
        refreshList();
        console.log('Refreshed:', new Date().toLocaleTimeString());
    }
}, 10000);

// Create toggle button
const toggleBtn = document.createElement('button');
toggleBtn.textContent = 'Pause Refresh';
toggleBtn.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 999999;
    padding: 8px 12px;
    background: #d32f2f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

toggleBtn.onclick = () => {
    paused = !paused;

    if (paused) {
        toggleBtn.textContent = 'Resume Refresh';
        toggleBtn.style.background = '#2e7d32';
        console.log('Auto-refresh paused');
    } else {
        toggleBtn.textContent = 'Pause Refresh';
        toggleBtn.style.background = '#d32f2f';
        console.log('Auto-refresh resumed');
    }
};

document.body.appendChild(toggleBtn);