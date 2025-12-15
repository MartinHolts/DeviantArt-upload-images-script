// Function to create a pause/delay
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function startLoop() {
    console.log("--- Script Started ---");
    
    // This variable keeps the loop running. 
    // To stop it, type `keepRunning = false` in the console.
    window.keepRunning = true; 

    while (window.keepRunning) {
        
        // --- STEP 1: Find and Click "Edit" Button ---
        // We select the button that has the title "Edit" and the specific classes
        const editButton = document.querySelector('button[title="Edit"]');
        
        if (editButton) {
            editButton.click();
            console.log("1. Clicked 'Edit' button.");
        } else {
            console.log("x 'Edit' button not found. Retrying in loop...");
        }

        // --- STEP 2: Wait 10 Seconds for Modal ---
        console.log("   ...Waiting 10 seconds for modal...");
        await wait(10000); 

        // --- STEP 3: Find and Click "Submit" Button ---
        // We look for the button with class 'VwjxrB'
        const submitButton = document.querySelector('button.VwjxrB');

        if (submitButton) {
            submitButton.click();
            console.log("2. Clicked 'Submit' button.");
        } else {
            console.log("x 'Submit' button not found (Modal might not be open).");
        }

        // --- STEP 4: Wait 10 Seconds before restarting ---
        console.log("   ...Waiting 10 seconds before next cycle...");
        await wait(10000);
    }
    
    console.log("--- Script Stopped ---");
}

// Start the function
startLoop();
