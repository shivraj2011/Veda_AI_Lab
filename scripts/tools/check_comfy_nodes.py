
import sys
import os
import importlib
import traceback

# Add custom nodes to path
nodes_path = r"C:\Users\Shashwat Shiv Raj\AppData\Local\Programs\ComfyUI\resources\ComfyUI\custom_nodes"
sys.path.append(nodes_path)

print(f"Python Executable: {sys.executable}")
print(f"Python Version: {sys.version}")

def check_node(name, folder):
    full_path = os.path.join(nodes_path, folder)
    print(f"\n--- Checking {name} at {full_path} ---")
    if not os.path.exists(full_path):
        print(f"ERROR: folder does not exist!")
        return
    
    try:
        # Check basic dependencies first
        if name == "GGUF":
            import gguf
            print("Successfully imported 'gguf'.")
        elif name == "TripoSR":
            import rembg
            import trimesh
            import omegaconf
            print("Successfully imported TripoSR dependencies.")

        # Try to load the module
        sys.path.insert(0, full_path)
        module = importlib.import_module("__init__")
        print(f"SUCCESS: {name} loaded!")
        if hasattr(module, "NODE_CLASS_MAPPINGS"):
            print(f"Mappings: {list(module.NODE_CLASS_MAPPINGS.keys())[:5]}... ({len(module.NODE_CLASS_MAPPINGS)} total)")
        sys.path.pop(0)
    except Exception as e:
        print(f"FAILED to load {name}:")
        traceback.print_exc()

check_node("GGUF", "ComfyUI-GGUF")
check_node("TripoSR", "ComfyUI-Flowty-TripoSR")
check_node("VideoHelperSuite", "ComfyUI-VideoHelperSuite")
