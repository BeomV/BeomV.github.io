window.onload = function () {
    const addBlockButton = document.getElementById('addBlock');
  
    function setupButtons(block) {
      const editButton = block.querySelector('.edit');
      const copyButton = block.querySelector('.copy');
      const deleteButton = block.querySelector('.delete');
  
      editButton.addEventListener('click', function () {
        const codeContent = this.parentElement.parentElement.nextElementSibling;
        const newContent = prompt("Edit your content", codeContent.textContent);
        if (newContent !== null) {
          codeContent.textContent = newContent;
          saveBlocksToLocalStorage();
        }
      });
  
      copyButton.addEventListener('click', function () {
        const codeContent = this.parentElement.parentElement.nextElementSibling;
        navigator.clipboard.writeText(codeContent.textContent)
          .then(() => alert('Copied to clipboard'))
          .catch(err => console.error('Could not copy text: ', err));
      });
  
      deleteButton.addEventListener('click', function () {
        block.remove();
        saveBlocksToLocalStorage();
      });
    }
  
    document.querySelectorAll('.code-block').forEach(setupButtons);
  
    addBlockButton.addEventListener('click', function () {
      const newBlock = document.createElement('div');
      newBlock.className = "code-block";
      newBlock.innerHTML = `
        <h2 class="code-title">New Title<div class="actions"><span class="edit"><i class="fas fa-edit"></i></span><span class="copy"><i class="fas fa-copy"></i></span><span class="delete"><i class="fas fa-trash-alt"></i></span></div></h2>
        <pre class="code-content">New content</pre>
      `;
      document.body.insertBefore(newBlock, this);
      setupButtons(newBlock);
      saveBlocksToLocalStorage();
    });
  
    function saveBlocksToLocalStorage() {
      const blocks = Array.from(document.querySelectorAll('.code-block')).map(block => {
        return {
          title: block.querySelector('.code-title').textContent,
          content: block.querySelector('.code-content').textContent
        };
      });
      localStorage.setItem('codeBlocks', JSON.stringify(blocks));
    }
  
    function loadBlocksFromLocalStorage() {
      const blocks = JSON.parse(localStorage.getItem('codeBlocks'));
      if (blocks) {
        const container = document.querySelector('body');
        blocks.forEach(blockData => {
          const newBlock = document.createElement('div');
          newBlock.className = "code-block";
          newBlock.innerHTML = `
            <h2 class="code-title">${blockData.title}<div class="actions"><span class="edit"><i class="fas fa-edit"></i></span><span class="copy"><i class="fas fa-copy"></i></span><span class="delete"><i class="fas fa-trash-alt"></i></span></div></h2>
            <pre class="code-content">${blockData.content}</pre>
          `;
          container.insertBefore(newBlock, addBlockButton);
          setupButtons(newBlock);
        });
      }
    }
  
    loadBlocksFromLocalStorage();
  };
  