// Native fetch is available in Node 18+
async function testComfy() {
    try {
        const res = await fetch('http://127.0.0.1:8188/system_stats');
        if (res.ok) {
            // Log status if successful
            const stats = await res.json();
            console.log("ComfyUI Connected!", stats);
        } else {
            console.error("ComfyUI responding but with error:", res.status);
        }
    } catch (e) {
        console.error("ComfyUI Connection Failed (Is it running on port 8188?)", e.message);
    }
}

testComfy();
