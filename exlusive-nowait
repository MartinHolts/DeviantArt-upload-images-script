// Helper: Wait for element
const waitForElement = (selector, timeout = 5000) => {
    return new Promise((resolve) => {
        const startTime = Date.now();
        const timer = setInterval(() => {
            const el = document.querySelector(selector);
            if (el || (Date.now() - startTime) > timeout) {
                clearInterval(timer);
                resolve(el);
            }
        }, 100);
    });
};

// Helper: Wait for element to DISAPPEAR (crucial for modals)
const waitForDisappearance = (selector, timeout = 5000) => {
    return new Promise((resolve) => {
        const startTime = Date.now();
        const timer = setInterval(() => {
            const el = document.querySelector(selector);
            if (!el || (Date.now() - startTime) > timeout) {
                clearInterval(timer);
                resolve();
            }
        }, 100);
    });
};

function setReactValue(input, value) {
    const lastValue = input.value;
    input.value = value;
    const event = new Event('input', { bubbles: true });
    const tracker = input._valueTracker;
    if (tracker) { tracker.setValue(lastValue); }
    input.dispatchEvent(event);
    input.dispatchEvent(new Event('change', { bubbles: true }));
}

async function startLoop() {
    console.log("--- Robust Script Started ---");
    window.keepRunning = true; 

    while (window.keepRunning) {
        
        // --- STEP 1: Find the NEXT "Edit" button ---
        // We look for all edit buttons and pick the first one visible
        let editButtons = Array.from(document.querySelectorAll('button[title="Edit"]'));
        let editButton = editButtons[0]; 

        if (!editButton) {
            console.log("No 'Edit' button found. Waiting for list to load...");
            await new Promise(r => setTimeout(r, 2000));
            continue; 
        }

        console.log("1. Clicking 'Edit'...");
        editButton.click();

        // --- STEP 2: Wait for Modal & Toggle Exclusive ---
        // Wait for the toggle button to appear
        const exclusiveBtn = await waitForElement('button.kLhpgF.EmRZoj.SoTRex.YfVnml');
        
        if (exclusiveBtn) {
            await new Promise(r => setTimeout(r, 500)); // Short breath for animations
            
            if (exclusiveBtn.getAttribute('aria-pressed') === 'false') {
                exclusiveBtn.click();
                console.log("2. Toggled 'Exclusive' ON.");
                await new Promise(r => setTimeout(r, 1000)); 
            }

            // --- STEP 3: Set Prices ---
            const purchaseInput = await waitForElement('input[name="purchase_price"]');
            if (purchaseInput) {
                setReactValue(purchaseInput, "2");
                console.log("3. Price set to 2.");
            }

            const offerInput = await waitForElement('input[name="offer"]');
            if (offerInput) {
                setReactValue(offerInput, "1");
                console.log("4. Offer set to 1.");
            }
            
            await new Promise(r => setTimeout(r, 500));
        }

        // --- STEP 4: Submit ---
        const submitButton = document.querySelector('button.VwjxrB');
        if (submitButton) {
            submitButton.click();
            console.log("5. Clicked 'Submit'.");
            
            // --- STEP 5: WAIT FOR MODAL TO CLOSE ---
            // This prevents the script from trying to click "Edit" while the old screen is still closing
            console.log("Waiting for modal to clear...");
            await waitForDisappearance('button.VwjxrB'); 
            await new Promise(r => setTimeout(r, 1500)); // Safety buffer for list refresh
        } else {
            // If we opened the modal but couldn't find submit, just close it
            console.log("x Submit button not found. Closing modal.");
            const closeBtn = document.querySelector('button[aria-label="Close"]');
            if (closeBtn) closeBtn.click();
            await new Promise(r => setTimeout(r, 1000));
        }
    }
    
    console.log("--- Script Stopped ---");
}

startLoop();
