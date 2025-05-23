# Smart Mermaid: AI-Powered Text-to-Mermaid Chart Tool

Smart Mermaid is a web application that leverages artificial intelligence to intelligently convert your textual descriptions into Mermaid-format chart code and render them as visual diagrams in real-time. Whether it's flowcharts, sequence diagrams, Gantt charts, or state diagrams, simply input your text, and the AI will generate the corresponding chart for you.

## Try It Live

[https://smart-mermaid.aizhi.site](https://smart-mermaid.aizhi.site)

**Note:** The application has a built-in API Key for immediate free use. To prevent abuse, a daily limit of 5 free generations per user is in place. If you require a higher quota, please contact the author.

## Preview

![Smart Mermaid Application Preview](https://github.com/user-attachments/assets/a3ec8b36-155d-469a-bf4e-c9635df1f963)
*Image: Smart Mermaid interface showing generated chart*

## Core Advantages

* **Simplified Charting**: Say goodbye to the tedious process of manually writing Mermaid code. Generate charts quickly using natural language descriptions.
* **Increased Efficiency**: Rapidly transform ideas into visual diagrams, saving you time on documentation and presentations.
* **Intelligent Assistance**: The AI automatically analyzes text, understands intent, and selects the appropriate chart type (or you can specify one).

## Key Features

* **Flexible Text Input**:
    * Manually type or paste text directly into the editor.
    * Upload files (supports .txt, .md, .docx formats).
    * Supports input up to 20,000 characters.
* **Intelligent AI Conversion**:
    * Integrated with advanced AI models to analyze text content.
    * Supports automatic detection of the best chart type or user-specified selection.
    * Accurately generates Mermaid-compliant chart code.
* **Convenient Chart Display & Editing**:
    * Clearly displays the AI-generated Mermaid source code.
    * Integrates Excalidraw for visual rendering of charts.
    * Supports further editing and exporting of charts (e.g., PNG, SVG) on the Excalidraw canvas.

## How to Use

1.  **Input Descriptive Text**:
    * Directly type or paste your chart description into the text area on the left.
    * Alternatively, click the upload button to select a local `.txt`, `.md`, or `.docx` file.
2.  **Select Chart Type**:
    * Choose your desired chart type (e.g., Flowchart, Sequence Diagram) from the dropdown menu.
    * You can also select "Auto Select," allowing the AI to determine the most suitable chart type based on your text.
3.  **Generate Chart**:
    * Click the "Generate Chart" button.
    * The AI will process your text and display the generated Mermaid code and the Excalidraw-rendered chart in the right-hand area.
4.  **View & Edit**:
    * You can view or modify the Mermaid code directly in the code area; the chart will update in real-time.
    * The Excalidraw canvas allows you to drag elements, modify styles, and export the chart.

## Technology Stack

* **Frontend Framework**: Next.js 15 (App Router)
* **UI Component Library**: shadcn/ui
* **CSS Framework**: Tailwind CSS
* **Chart Rendering & Processing**:
    * Excalidraw (`@excalidraw/excalidraw`)
    * Mermaid to Excalidraw converter (`@excalidraw/mermaid-to-excalidraw`)
* **File Parsing**: mammoth (for handling `.docx` files)
* **AI Service**: Compatible with OpenAI API mode

## Local Deployment Guide

### Prerequisites

* Node.js 18.x or higher
* npm or yarn package manager

### Installation Steps

1.  **Clone the Repository**:
    ```bash
    git clone [https://github.com/yourusername/smart-mermaid.git](https://github.com/yourusername/smart-mermaid.git)
    cd smart-mermaid
    ```
    *(Please replace `yourusername` with the actual repository path)*

2.  **Install Dependencies**:
    ```bash
    npm install
    # Or
    yarn install
    ```

3.  **Configure Environment Variables**:
    Create a `.env.local` file in the project root directory and add the following configurations:
    ```plaintext
    AI_API_URL=[https://api.openai.com/v1/chat/completions](https://api.openai.com/v1/chat/completions)
    AI_API_KEY=your_api_key_here
    AI_MODEL_NAME=gpt-3.5-turbo
    NEXT_PUBLIC_MAX_CHARS=20000
    NEXT_PUBLIC_DAILY_USAGE_LIMIT=5
    ```

    **Environment Variable Descriptions**:
    * `AI_API_URL`: The endpoint address for the AI service API.
    * `AI_API_KEY`: Your AI service API key.
    * `AI_MODEL_NAME`: Specifies the AI model to be used.
    * `NEXT_PUBLIC_MAX_CHARS`: Maximum number of characters allowed for user input (default 20,000).
    * `NEXT_PUBLIC_DAILY_USAGE_LIMIT`: Daily API call limit per user (default 5).

4.  **Start the Development Server**:
    ```bash
    npm run dev
    # Or
    yarn dev
    ```

5.  **Access the Application**:
    Open `http://localhost:3000` in your browser to access the locally deployed application.


## Contributions & Feedback

If you encounter any issues or have feature suggestions, please feel free to raise them via GitHub Issues. We also welcome you to fork this project and submit Pull Requests to contribute!
