<div align='center'>

<img src="https://raw.githubusercontent.com/ibrahimhabibeg/Dahih-Al-Dofaa/main/public/icon.png" width='180px'/>

<h1>Dahih Al-Dofaa</h1>
<p> رفيق ليلة الامتحان</p>

<h4> <span> · </span> <a href="https://github.com/ibrahimhabibeg/Dahih-Al-Dofaa/releases"> Download </a> <span> · </span> <a href="https://github.com/ibrahimhabibeg/Dahih-Al-Dofaa/issues"> Report Bug </a> <span> · </span> <a href="https://github.com/ibrahimhabibeg/Dahih-Al-Dofaa/issues"> Request Feature </a> </h4>

</div>

## Table of Contents

- [Overview](#overview-🚀)
- [Download](#download-📥)
- [App Setup](#app-setup-⚙️)
- [Purpose and Target Audience](#purpose-and-target-audience-🚀)
- [Features](#features)
- [Technologies](#technologies-🚀)
- [Getting Started (Developers)](#getting-started-developers)
- [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
- [Contant Me](#contact-me)

## Overview 🚀

**Dahih Al-Dofaa** 📚 is an open-source, desktop application designed to revolutionize the way students approach learning. It's a groundbreaking, offline study companion 🧑‍💻 that leverages the power of Retrieval Augmented Generation (RAG) to transform your learning experience. Unlike traditional online chatbots 🤖, Dahih Al-Dofaa focuses on providing answers derived exclusively from your uploaded documents. By uploading textbooks, notes, and research papers, you create a personalized knowledge base accessible anytime, anywhere, without requiring an internet connection. 🌐

Dahih prioritizes user privacy by keeping all data local 🔒. Your documents and generated information remain securely on your device. With Dahih, you can study confidently, knowing your sensitive information is protected. 💪

Experience the future of learning with Dahih. Get accurate answers, deepen your understanding, and unlock your full academic potential. 🎓


## Download 📥

Dahih is available for download on Windows 💻, Debian-based Linux 🐧, and RPM-based Linux systems 🖥️. To get started, follow these simple steps:

1. Visit our GitHub releases page: [Insert link to GitHub releases]
2. Select the appropriate download for your operating system.
   - **Windows**: dahih-al-dofaa-[Version Number].**Setup.exe**
   - **Debian (Ubuntu)**: dahih-al-dofaa-[Version Number]_amd64.**deb**
   - **RPM**: dahih-al-dofaa-[Version Number]-1.x86_64.**rpm**
3. Download the installation file. ⬇️
4. Run the installer. 🚀
5. Once installed, launch Dahih and start exploring its powerful features! 🤩

Note: Ensure your system has at least 8GB of RAM. 🧠

## App Setup ⚙️

Upon launching Dahih for the first time, you'll be prompted to download and select an LLM (Large Language Model) 🧠 and an embedding model. These models are essential for the app's functionality. ⚡

**Recommended Models:**

* **LLM:**
  * **llama 3.1:** For systems with 16GB of RAM or more, llama 3.1 offers exceptional performance and accuracy. 🚀
  * **phi-2:** If your system has 8GB of RAM, phi-2 is a suitable alternative providing a good balance of performance and efficiency. ⚖️
  * **qwen 2 small:** If you prioritize performance above anything else. 💨
* **Embedding Model:** 
  * **nomic-embed-text:** This embedding model is recommended for its effectiveness in representing text data. 📚

Please note that these are suggestions based on common hardware configurations and model performance. You may explore and experiment with other models depending on your specific needs and system resources. 🧪

**Important**: Ensure you have enough storage space to accommodate the downloaded models. 💾

The app will guide you through the download and installation process for the selected models. 

## Purpose and Target Audience 🚀

**Dahih** is a revolutionary study tool designed to help students unlock their full potential. 🎓 Unlike traditional online chatbots 🤖, Dahih focuses on providing answers derived directly from your own study materials. 📚 By uploading textbooks, notes, and research papers, you create a personalized knowledge base accessible anytime, anywhere. 🌎

Dahih is specifically designed for students who value privacy 🔒 and efficiency. As a local application, it operates offline, ensuring your data remains secure and accessible without an internet connection. 🚫 This makes Dahih the perfect companion for focused study sessions and environments with limited connectivity. 📶

Our primary target audience includes university and college students seeking a more effective and private study solution. 🧑‍🎓👩‍🎓


## Features

* 🌐 **Offline Functionality:** Study anytime, anywhere without relying on an internet connection.
* 🔒 **Privacy Focus:** Your data stays on your device, ensuring complete privacy and security.
* 📚 **Document Uploading:** Easily import textbooks, notes, and research papers.
* 🤔 **Intelligent Question Answering:** Get accurate and informative answers to your study questions.
* 🚀 **Personalized Learning:** Tailor your study experience to your specific needs.
* 🔍 **Efficient Knowledge Access:** Quickly find relevant information within your documents.
* ✨ **User-Friendly Interface:** Intuitive design for seamless navigation. 


Dahih combines the power of AI with the convenience of offline access to provide an unparalleled study experience.

## Technologies 🚀

Dahih is built on a robust foundation of open-source technologies:

* **Node.js** 🖥️: Provides the JavaScript runtime environment.
* **Electron** ⚡️: Delivers the framework for building cross-platform desktop applications.
* **React** ⚛️: Constructs the dynamic and efficient user interface.
* **TypeScript** 📝: Enhances code reliability and maintainability.
* **Material UI** 🎨: Offers a comprehensive UI component library for efficient development.
* **Ollama** 🧠: Serves as the versatile LLM runner, supporting a wide range of models.
* **LangChain** ⛓️: Facilitates the orchestration of LLM workflows.
* **Orama** 🗄️: Functions as the vector database for efficient document search.

### Supported Large Language Models 🤖

Dahih leverages the power of Ollama to support a diverse range of Large Language Models (LLMs), including:

* **Llama** 🦙 (Meta AI)
* **Phi** ϕ (Microsoft)
* **Gemma** 💎 (Google AI)
* **Qwen** 🦉 (Alibaba)

This flexibility allows users to choose the model that best suits their needs and computational resources. Dahih's architecture is designed to accommodate future LLM integrations as they become available. 


## Getting Started (Developers)

**Prerequisites:**

- Node.js and **yarn** installed
- A code editor (Visual Studio Code recommended)

**Ollama Executables:**

Before running or building Dahih, you need to download and add the appropriate Ollama executables to the project directory. Ollama executables power the LLM functionality within the app.

1. Visit the latest Ollama release on GitHub: [Ollama Releases](https://github.com/ollama/ollama/releases/latest)
2. Download the Ollama executables for your operating system and architecture:
   - **Linux:** Download the `ollama-linux-amd64` file.
   - **Windows:** Download the `ollama-windows-amd64.zip` file, and extract its contents.
3. Place the downloaded executables (Linux) or extracted files (Windows) inside the `extraResources/ollama` directory within the Dahih project.

**Installation:**

1. Clone the repository:
   ```bash
   git clone https://github.com/ibrahimhabibeg/Dahih-Al-Dofaa.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Dahih-Al-Dofaa
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```

**Development Setup:**

To run the app in development mode:

```bash
yarn start
```

This will open the application in a new window.

**Building the App:**

To build the app for production:

```bash
yarn make
```

**Note:** This command builds executables specifically for the developer's operating system and architecture.

**Additional Notes:**

Dahih utilizes GitHub Actions for automated builds and releases. The build process is defined in the .github/workflows/publish.yml file. This file outlines the steps involved in building the app for Windows and Linux platforms.

For detailed insights into the build process, please refer to the publish.yml file. Understanding its contents can be invaluable for troubleshooting build-related issues.

By following these steps, you can successfully set up Dahih for development or build it for your system.

## Frequently Asked Questions (FAQ)

### General Questions

- **What is Dahih?**
  Dahih is an AI-powered study companion that helps you learn faster and more effectively by providing answers based on your own documents.
- **How does Dahih work?**
  You upload your textbooks, notes, and research papers to Dahih. Then, you can ask questions related to those documents, and Dahih will provide accurate and informative answers.
- **Is Dahih free?**
  Yes, Dahih is completely free and open-source.
- **What kind of documents can I upload?**
  Dahih currently supports PDF, DOCX, and PPTX files. The app can only process text within these documents, so images and other non-textual content will be ignored.
- **Is my data private?**
  Yes, your data is completely private. All processing is done locally on your device, and no data is sent to external servers.

### Technical Questions

- **What operating systems are supported?**
  Dahih currently supports Windows, Debian-based Linux, and RPM-based Linux.
- **What LLMs does Dahih support?**
  Dahih supports a variety of LLMs, including Llama, Phi, Gemma, and Qwen.
- **Do I need an internet connection to use Dahih?**
  While an internet connection is required for downloading the initial language models, once downloaded, Dahih operates entirely offline. You can import documents, ask questions, and receive answers without an internet connection.
- **What are the system requirements?**
  Dahih requires a minimum of 8GB RAM for optimal performance. The specific requirements may vary depending on the chosen LLM and the size of your documents.

### Troubleshooting

- **I'm having trouble installing Dahih.** Please refer to the "Download" section of the README for detailed instructions. If you continue to experience issues, please check the GitHub repository for troubleshooting tips or open an issue.
- **Dahih is not responding.** Please ensure that you have the required Ollama executables in the correct location and that your system meets the minimum requirements. Try restarting the app or reinstalling it if the issue persists.
- **I'm getting inaccurate answers.** The quality of the answers depends on the quality of your uploaded documents. Ensure that your documents are clear and well-structured. You can also try different LLMs to see if it improves the results.

If you have any further questions or encounter issues, please don't hesitate to open an issue on the GitHub repository.

## Contact Me

We welcome your feedback, suggestions, and contributions to Dahih. If you encounter any issues or have questions, please don't hesitate to reach out.

**Preferred Contact Methods:**

- **GitHub Issues:** For bug reports, feature requests, or general discussions, please open an issue on the Dahih GitHub repository: https://github.com/ibrahimhabibeg/Dahih-Al-Dofaa
- **GitHub:** Connect with me on GitHub: https://github.com/ibrahimhabibeg
- **LinkedIn:** Connect with me on LinkedIn for professional networking and updates: https://www.linkedin.com/in/ibrahimhabibeg/
- **Email:** ibrahimhabib.eg@gmail.com

We strive to respond to all inquiries as promptly as possible.
