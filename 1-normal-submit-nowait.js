// Helper: Wait for element to appear (Real-time)
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

// Helper: Wait for element to DISAPPEAR (Ensures the site finished saving)
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

async function startLoop() {
    console.log("--- Real-Time Script Started ---");
    window.keepRunning = true;

    while (window.keepRunning) {
        
        // 1. Find the Edit Button
        const editButton = document.querySelector('button[title="Edit"]');
        
        if (editButton) {
            console.log("1. Clicking 'Edit'...");
            editButton.click();

            // 2. Wait for the Submit button to appear in the modal
            const submitButton = await waitForElement('button.VwjxrB');

            if (submitButton) {
                // Short 500ms breath to let React register the modal is open
                await new Promise(r => setTimeout(r, 500)); 
                
                console.log("2. Clicking 'Submit'...");
                submitButton.click();

                // 3. WAIT FOR MODAL TO CLEAR (Crucial part from script 2)
                // This stops the script from trying to click the next button 
                // while the screen is still "darkened" or loading.
                await waitForDisappearance('button.VwjxrB');
                
                // 4. Safety Buffer (List Refresh)
                // We wait 1.5 seconds to let the website update the list 
                // so the next "Edit" button is valid.
                await new Promise(r => setTimeout(r, 1500)); 
                console.log("3. Cycle complete. Looking for next item...");
            } else {
                console.log("x Submit button didn't appear. Retrying...");
            }

        } else {
            // If no button is found, wait 2 seconds before checking again
            console.log("Searching for 'Edit' button...");
            await new Promise(r => setTimeout(r, 2000));
        }
    }

    console.log("--- Script Stopped ---");
}

startLoop();
