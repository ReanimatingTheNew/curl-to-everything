// 等待DOM内容加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 选项卡切换功能
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前点击的按钮添加active类
            this.classList.add('active');
            
            // 获取当前选项卡的ID
            const tabId = this.getAttribute('data-tab');
            
            // 隐藏所有选项卡内容
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // 显示当前选项卡内容
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 平滑滚动功能
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 平滑滚动到目标元素
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 添加代码高亮效果
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        // 为代码块添加行号
        const lines = block.textContent.split('\n');
        let numberedCode = '';
        
        lines.forEach((line, index) => {
            if (index < lines.length - 1 || lines[lines.length - 1].trim() !== '') {
                numberedCode += `<span class="line-number">${index + 1}</span>${line}\n`;
            }
        });
        
        block.innerHTML = numberedCode;
        
        // 添加复制按钮
        const pre = block.parentNode;
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.textContent = '复制';
        
        copyButton.addEventListener('click', function() {
            const code = block.textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.textContent = '已复制!';
                setTimeout(() => {
                    copyButton.textContent = '复制';
                }, 2000);
            }).catch(err => {
                console.error('复制失败:', err);
            });
        });
        
        pre.appendChild(copyButton);
    });
    
    // 添加响应式导航菜单
    const createMobileMenu = () => {
        const nav = document.querySelector('.main-nav');
        const navLinks = document.querySelector('.nav-links');
        
        // 创建汉堡菜单按钮
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        menuToggle.setAttribute('aria-label', '切换导航菜单');
        
        // 将按钮添加到导航栏
        nav.insertBefore(menuToggle, navLinks);
        
        // 添加点击事件
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    };
    
    // 检查窗口宽度，如果小于768px则创建移动菜单
    if (window.innerWidth < 768) {
        createMobileMenu();
    }
    
    // 窗口大小改变时检查
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768) {
            if (!document.querySelector('.menu-toggle')) {
                createMobileMenu();
            }
        } else {
            const menuToggle = document.querySelector('.menu-toggle');
            if (menuToggle) {
                menuToggle.remove();
                document.querySelector('.nav-links').classList.remove('active');
            }
        }
    });
    
    // 添加滚动动画效果
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .example-card, .stat-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // 初始检查
    animateOnScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', animateOnScroll);
    
    // 添加返回顶部按钮
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.innerHTML = '↑';
        button.setAttribute('aria-label', '返回顶部');
        
        document.body.appendChild(button);
        
        // 滚动时显示/隐藏按钮
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });
        
        // 点击返回顶部
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    createBackToTopButton();
    
    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        .line-number {
            display: inline-block;
            width: 2em;
            user-select: none;
            opacity: 0.5;
            text-align: right;
            margin-right: 1em;
        }
        
        pre {
            position: relative;
        }
        
        .copy-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.1);
            color: #abb2bf;
            border: none;
            border-radius: 4px;
            padding: 5px 10px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .copy-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .menu-toggle {
            display: none;
        }
        
        @media (max-width: 768px) {
            .menu-toggle {
                display: block;
                background: none;
                border: none;
                cursor: pointer;
                padding: 10px;
                z-index: 1000;
            }
            
            .menu-toggle span {
                display: block;
                width: 25px;
                height: 3px;
                background-color: var(--dark-color);
                margin: 5px 0;
                transition: all 0.3s ease;
            }
            
            .menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -7px);
            }
            
            .nav-links {
                position: fixed;
                top: 0;
                right: -100%;
                width: 80%;
                height: 100vh;
                background-color: white;
                flex-direction: column;
                justify-content: flex-start;
                padding-top: 80px;
                transition: all 0.3s ease;
                z-index: 999;
                box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
            }
            
            .nav-links.active {
                right: 0;
            }
            
            .nav-links li {
                margin: 15px 0;
            }
        }
        
        .feature-card, .example-card, .stat-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .feature-card.animate, .example-card.animate, .stat-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            font-size: 24px;
            border: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background-color: var(--primary-dark);
            transform: translateY(-5px);
        }
    `;
    
    document.head.appendChild(style);
});
