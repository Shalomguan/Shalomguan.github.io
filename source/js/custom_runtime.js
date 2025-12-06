// source/js/custom_runtime.js

document.addEventListener("DOMContentLoaded", function() {
  // 1. 设置你的建站日期 (格式：年, 月-1, 日)
  // 注意：月份是从0开始的！11月要写 10
  const startDate = new Date(2025, 10, 28); 
  
  // 2. 找到显示天数的元素
  // Volantis 的运行时间通常在一个 id 为 "runtime_span" 或者包含特定文字的标签里
  const updateRuntime = () => {
    const now = new Date();
    const days = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    
    // 暴力查找包含 "2166" 或者位于 "已运行时间" 旁边的数字元素
    // 这里我们尝试通过 DOM 结构定位（假设是侧边栏 webinfo 下的 runtime）
    const webinfoItems = document.querySelectorAll('.webinfo .webinfo-item');
    
    webinfoItems.forEach(item => {
      if (item.innerText.includes('已运行时间') || item.innerText.includes('Run time')) {
        const valueSpan = item.querySelector('.webinfo-content') || item.querySelector('span:last-child');
        if (valueSpan) {
          // 强制替换文本，保留 "天" 字
          valueSpan.innerText = `${days} 天`;
          // 也可以给它加个高亮颜色
          valueSpan.style.color = '#50fa7b'; 
          valueSpan.style.fontWeight = 'bold';
        }
      }
    });
  };

  // 延迟一秒执行，确保 Volantis 原本的脚本跑完后再覆盖它
  setTimeout(updateRuntime, 1000);
  // 为了保险，3秒后再执行一次（应对网络卡顿）
  setTimeout(updateRuntime, 3000);
});