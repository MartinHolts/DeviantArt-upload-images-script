// Function to create a pause/delay
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// SPECIAL FUNCTION: Forces React to recognize the new value
function setReactValue(input, value) {
    const lastValue = input.value;
    input.value = value;
    const event = new Event('input', { bubbles: true });
    // This tracker line is what tells React the value actually changed
    const tracker = input._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    input.dispatchEvent(event);
    input.dispatchEvent(new Event('change', { bubbles: true }));
}

async function startLoop() {
    console.log("--- Script Started ---");
    window.keepRunning = true; 

    while (window.keepRunning) {
        
        // --- STEP 1: Find and Click "Edit" Button ---
        const editButton = document.querySelector('button[title="Edit"]');
        if (editButton) {
            editButton.click();
            console.log("1. Clicked 'Edit' button.");
        } else {
            console.log("x 'Edit' button not found.");
        }

        // --- STEP 2: Wait for Modal ---
        await wait(5000); 

        // --- STEP 3: Toggle Exclusive & Set Prices ---
        const exclusiveBtn = document.querySelector('button.kLhpgF.EmRZoj.SoTRex.YfVnml');
        
        if (exclusiveBtn) {
            // Click to toggle if it's currently OFF
            if (exclusiveBtn.getAttribute('aria-pressed') === 'false') {
                exclusiveBtn.click();
                console.log("2. Toggled 'Exclusive' ON.");
                await wait(2000); 
            }

            // --- Set Purchase Price to 2 ---
            const purchaseInput = document.querySelector('input[name="purchase_price"]');
            if (purchaseInput) {
                purchaseInput.focus();
                setReactValue(purchaseInput, "2");
                console.log("3. Set Purchase Price to 2 (React state updated).");
            }

            // --- Set Offer Price to 1 ---
            const offerInput = document.querySelector('input[name="offer"]');
            if (offerInput) {
                offerInput.focus();
                setReactValue(offerInput, "1");
                console.log("4. Set Offer Price to 1 (React state updated).");
            }
            
            // Critical: Wait a moment for the site to "digest" the new values
            await wait(1500);
            // Click away (blur) to trigger any final site validation
            document.activeElement.blur();
            await wait(500);
        }

        // --- STEP 4: Submit ---
        const submitButton = document.querySelector('button.VwjxrB');
        if (submitButton) {
            submitButton.click();
            console.log("5. Clicked 'Submit' button.");
        } else {
            console.log("x 'Submit' button not found.");
        }

        // --- STEP 5: Wait before next cycle ---
        console.log("   ...Waiting 6 seconds before next cycle...");
        await wait(6000);
    }
    
    console.log("--- Script Stopped ---");
}

startLoop();
