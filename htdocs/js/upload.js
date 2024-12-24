document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('file-upload');
    const uploadContent = document.querySelector('.upload-content');

    function handleDrag(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleDragEnter(e) {
        handleDrag(e);
        uploadArea.classList.add('dragover');
    }

    function handleDragLeave(e) {
        handleDrag(e);
        uploadArea.classList.remove('dragover');
    }

    function handleDrop(e) {
        handleDrag(e);
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        const file = files[0];
        if (file && file.type === 'application/zip') {
            // Show upload success message
            uploadContent.innerHTML = `
                <i class="bi bi-check-circle text-success"></i>
                <p class="text-success">Successfully uploaded ${file.name}</p>
            `;
        } else {
            // Show error message
            uploadContent.innerHTML = `
                <i class="bi bi-x-circle text-danger"></i>
                <p class="text-danger">Please upload a ZIP file</p>
            `;
            setTimeout(() => {
                resetUploadArea();
            }, 3000);
        }
    }

    function resetUploadArea() {
        uploadContent.innerHTML = `
            <i class="bi bi-cloud-upload"></i>
            <p>Drop your ZIP file here or <label for="file-upload" class="text-primary">browse</label></p>
            <input type="file" id="file-upload" accept=".zip" class="d-none">
            <small class="text-muted">ZIP files up to 500MB</small>
        `;
    }

    uploadArea.addEventListener('dragenter', handleDragEnter);
    uploadArea.addEventListener('dragover', handleDragEnter);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
});