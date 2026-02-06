
# LogoFixer Tool 🎨

**LogoFixer** is a high-performance, browser-based utility designed to streamline the process of resizing and optimizing logos and images. Built with React and Vite, it allows developers and designers to batch-process images locally without ever uploading sensitive assets to a server.

## 🚀 Key Features

-   **Batch Processing**: Upload multiple images simultaneously for rapid resizing.
    
-   **Custom Scaling**: Adjust dimensions precisely using intuitive controls for width and height.
    
-   **Live Preview**: View changes in real-time within an interactive image grid before exporting.
    
-   **Privacy First**: All image processing occurs locally in your browser; no data is sent to external servers.
    
-   **Instant Export**: Bundle all processed images into a single, organized `.zip` file for quick downloading.
    
-   **UI Customization**: Includes features like color popovers and toast notifications for a polished user experience.
    

## 🛠️ Tech Stack

-   **Frontend**: React.js (Hooks, Functional Components)
    
-   **Build Tool**: Vite
    
-   **Styling**: Custom CSS with a focus on a clean, "card-based" dashboard design
    
-   **Utilities**:
    
    -   **JSZip**: For client-side ZIP archive generation
        
    -   **Lucide React / React Icons**: For professional iconography
        

## 📁 Project Structure

Plaintext

```
src/
├── components/       # Reusable UI components (Header, Footer, Toast, etc.)
├── assets/           # Static assets and SVGs
├── App.jsx           # Main application logic and state management
├── index.css         # Global styling and layout definitions
└── main.jsx          # Application entry point

```

## ⚙️ Installation & Setup

To run this project locally, follow these steps:

1.  **Clone the repository**:
    
    Bash
    
    ```
    git clone https://github.com/your-username/logo-resizer.git
    cd logo-resizer
    
    ```
    
2.  **Install dependencies**:
    
    Bash
    
    ```
    npm install
    
    ```
    
3.  **Start the development server**:
    
    Bash
    
    ```
    npm run dev
    
    ```
    
4.  **Build for production**:
    
    Bash
    
    ```
    npm run build
    
    ```
    

## 📖 Usage

1.  **Upload**: Drag and drop or select the images you wish to resize.
    
2.  **Configure**: Use the **Controls** panel to set your desired dimensions or scale.
    
3.  **Preview**: Check the **Image Grid** to ensure all logos look correct.
    
4.  **Download**: Click "Download ZIP Bundle" to save all your resized assets at once.
    

----------

### 📝 License

This project is open-source and available under the MIT License.

Created by [Shakeeb Ahmed]. All processing happens in your browser.
