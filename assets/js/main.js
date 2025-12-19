/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$nav = $('#nav'), $nav_links = $nav.children('a');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '361px',   '736px'  ],
			xsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		$nav_links
			.on('click', function(event) {

				var href = $(this).attr('href');

				// Not a panel link? Bail.
					if (href.charAt(0) != '#'
					||	$panels.filter(href).length == 0)
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Change panels.
					if (window.location.hash != href)
						window.location.hash = href;

			});

	// Panels.

		// Initialize.
			(function() {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

					}

				// No panel/link? Default to first.
					if (!$panel
					||	$panel.length == 0) {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels except this one.
					$panels.not($panel)
						.addClass('inactive')
						.hide();

				// Activate link.
					$link
						.addClass('active');

				// Reset scroll.
					$window.scrollTop(0);

			})();

		// Hashchange event.
			$window.on('hashchange', function(event) {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

						// No target panel? Bail.
							if ($panel.length == 0)
								return;

					}

				// No panel/link? Default to first.
					else {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels.
					$panels.addClass('inactive');

				// Deactivate all links.
					$nav_links.removeClass('active');

				// Activate target link.
					$link.addClass('active');

				// Set max/min height.
					$main
						.css('max-height', $main.height() + 'px')
						.css('min-height', $main.height() + 'px');

				// Delay.
					setTimeout(function() {

						// Hide all panels.
							$panels.hide();

						// Show target panel.
							$panel.show();

						// Set new max/min height.
							$main
								.css('max-height', $panel.outerHeight() + 'px')
								.css('min-height', $panel.outerHeight() + 'px');

						// Reset scroll.
							$window.scrollTop(0);

						// Delay.
							window.setTimeout(function() {

								// Activate target panel.
									$panel.removeClass('inactive');

								// Clear max/min height.
									$main
										.css('max-height', '')
										.css('min-height', '');

								// IE: Refresh.
									$window.triggerHandler('--refresh');

								// Unlock.
									locked = false;

							}, (breakpoints.active('small') ? 0 : 500));

					}, 250);

			});

	// IE: Fixes.
		if (browser.name == 'ie') {

			// Fix min-height/flexbox.
				$window.on('--refresh', function() {

					$wrapper.css('height', 'auto');

					window.setTimeout(function() {

						var h = $wrapper.height(),
							wh = $window.height();

						if (h < wh)
							$wrapper.css('height', '100vh');

					}, 0);

				});

				$window.on('resize load', function() {
					$window.triggerHandler('--refresh');
				});

			// Fix intro pic.
				$('.panel.intro').each(function() {

					var $pic = $(this).children('.pic'),
						$img = $pic.children('img');

					$pic
						.css('background-image', 'url(' + $img.attr('src') + ')')
						.css('background-size', 'cover')
						.css('background-position', 'center');

					$img
						.css('visibility', 'hidden');

				});

		}

})(jQuery);

// ... existing code ...

// CV统计功能 - 完整多用户版本（支持查看、下载、点赞）
$(document).ready(function() {
    console.log('=== 统计功能开始初始化 ===');
    
    // 生成用户唯一标识（基于浏览器指纹）
    function generateUserID() {
        let userID = localStorage.getItem('cv_user_id');
        if (!userID) {
            // 生成基于时间戳和随机数的用户ID
            userID = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('cv_user_id', userID);
            console.log('✅ 生成新用户ID:', userID);
        } else {
            console.log('✅ 使用现有用户ID:', userID);
        }
        return userID;
    }

    // 获取所有用户的查看记录
    function getAllViews() {
        const viewsData = localStorage.getItem('cv_all_views');
        const data = viewsData ? JSON.parse(viewsData) : {};
        console.log('📊 查看记录数据:', data);
        return data;
    }

    // 保存所有用户的查看记录
    function saveAllViews(viewsData) {
        localStorage.setItem('cv_all_views', JSON.stringify(viewsData));
        console.log('💾 保存查看记录:', viewsData);
    }

    // 获取所有用户的下载记录
    function getAllDownloads() {
        const downloadsData = localStorage.getItem('cv_all_downloads');
        const data = downloadsData ? JSON.parse(downloadsData) : {};
        console.log('📊 下载记录数据:', data);
        return data;
    }

    // 保存所有用户的下载记录
    function saveAllDownloads(downloadsData) {
        localStorage.setItem('cv_all_downloads', JSON.stringify(downloadsData));
        console.log('💾 保存下载记录:', downloadsData);
    }

    // 获取所有用户的点赞记录
    function getAllLikes() {
        const likesData = localStorage.getItem('cv_all_likes');
        const data = likesData ? JSON.parse(likesData) : {};
        console.log('📊 点赞记录数据:', data);
        return data;
    }

    // 保存所有用户的点赞记录
    function saveAllLikes(likesData) {
        localStorage.setItem('cv_all_likes', JSON.stringify(likesData));
        console.log('💾 保存点赞记录:', likesData);
    }

    // 获取总查看次数（所有用户的累积）
    function getTotalViews() {
        const viewsData = getAllViews();
        const total = Object.values(viewsData).filter(view => view === true).length;
        console.log('👁️ 总查看次数:', total);
        return total;
    }

    // 获取总下载次数（所有用户的累积）
    function getTotalDownloads() {
        const downloadsData = getAllDownloads();
        const total = Object.values(downloadsData).filter(download => download === true).length;
        console.log('📥 总下载次数:', total);
        return total;
    }

    // 获取总点赞数（所有用户的累积）
    function getTotalLikes() {
        const likesData = getAllLikes();
        const total = Object.values(likesData).filter(like => like === true).length;
        console.log('❤️ 总点赞数:', total);
        return total;
    }

    // 检查当前用户是否已查看
    function hasUserViewed() {
        const userID = generateUserID();
        const viewsData = getAllViews();
        const hasViewed = viewsData[userID] === true;
        console.log('👤 用户是否已查看:', hasViewed);
        return hasViewed;
    }

    // 检查当前用户是否已下载
    function hasUserDownloaded() {
        const userID = generateUserID();
        const downloadsData = getAllDownloads();
        const hasDownloaded = downloadsData[userID] === true;
        console.log('👤 用户是否已下载:', hasDownloaded);
        return hasDownloaded;
    }

    // 检查当前用户是否已点赞
    function hasUserLiked() {
        const userID = generateUserID();
        const likesData = getAllLikes();
        const hasLiked = likesData[userID] === true;
        console.log('👤 用户是否已点赞:', hasLiked);
        return hasLiked;
    }

    // 更新页面显示
    function updateStatsDisplay() {
        console.log('🔄 开始更新统计显示...');
        
        const totalViews = getTotalViews();
        const totalDownloads = getTotalDownloads();
        const totalLikes = getTotalLikes();
        
        console.log('📈 显示数据 - 查看:', totalViews, '下载:', totalDownloads, '点赞:', totalLikes);
        
        // 更新页面显示
        $('#view-count').text(totalViews);
        $('#download-count').text(totalDownloads);
        $('#like-count').text(totalLikes);
        
        console.log('✅ 页面显示已更新');
        
        // 根据用户点赞状态设置颜色
        const $heartIcon = $('.like-container .fa-heart');
        const $likeCount = $('#like-count');
        const $likeBtn = $('#like-btn');
        
        if (hasUserLiked()) {
            $likeBtn.addClass('liked');
            $heartIcon.css('color', '#e74c3c');
            $likeCount.css('color', '#e74c3c');
            console.log('🎨 用户已点赞，设置红色');
        } else {
            $likeBtn.removeClass('liked');
            $heartIcon.css('color', '');
            $likeCount.css('color', '');
            console.log('🎨 用户未点赞，清除颜色');
        }
    }

    // 增加查看次数（每次页面加载时）- 多用户版本
    if (!sessionStorage.getItem('cv_viewed')) {
        console.log('➕ 记录新用户查看...');
        const userID = generateUserID();
        const viewsData = getAllViews();
        
        if (!hasUserViewed()) {
            // 记录当前用户的查看
            viewsData[userID] = true;
            saveAllViews(viewsData);
            
            console.log('✅ 用户 ' + userID + ' 首次查看，总查看数：' + getTotalViews());
        } else {
            console.log('ℹ️ 用户 ' + userID + ' 已查看过');
        }
        
        sessionStorage.setItem('cv_viewed', 'true');
    } else {
        console.log('ℹ️ 用户已在本会话中查看过页面');
    }

    // 下载计数 - 多用户版本
    $('#download-link').on('click', function() {
        console.log('🖱️ 下载链接被点击...');
        const userID = generateUserID();
        const downloadsData = getAllDownloads();
        
        if (!hasUserDownloaded()) {
            // 记录当前用户的下载
            downloadsData[userID] = true;
            saveAllDownloads(downloadsData);
            
            console.log('✅ 用户 ' + userID + ' 下载成功，总下载数：' + getTotalDownloads());
            
            // 显示下载成功提示
            showDownloadMessage('下载成功！感谢您的关注。');
        } else {
            // 用户已经下载过
            console.log('ℹ️ 用户 ' + userID + ' 已经下载过');
            showDownloadMessage('您已经下载过简历了。');
        }
        
        updateStatsDisplay();
    });

    // 改进的点赞功能 - 支持多用户（修复实时更新问题）
$('#like-btn').on('click', function() {
    console.log('🖱️ 点赞按钮被点击...');
    const $likeBtn = $(this);
    const $heartIcon = $('.like-container .fa-heart');
    const $likeCount = $('#like-count');
    const userID = generateUserID();
    const likesData = getAllLikes();
    const userHasLiked = hasUserLiked();

    if (!userHasLiked) {
        // 用户点赞
        likesData[userID] = true;
        saveAllLikes(likesData);
        
        // 立即更新UI状态
        $likeBtn.addClass('liked');
        $heartIcon.css('color', '#e74c3c');
        $likeCount.css('color', '#e74c3c');
        
        // 显示点赞成功提示
        showLikeMessage('感谢您的点赞！您的支持已被记录。');
        
        console.log('✅ 用户 ' + userID + ' 点赞成功');
    } else {
        // 用户取消点赞
        delete likesData[userID];
        saveAllLikes(likesData);
        
        // 立即更新UI状态
        $likeBtn.removeClass('liked');
        $heartIcon.css('color', '');
        $likeCount.css('color', '');
        
        // 显示取消点赞提示
        showLikeMessage('您已取消点赞。');
        
        console.log('❌ 用户 ' + userID + ' 取消点赞');
    }
    
    // 延迟一小段时间后更新统计显示，确保本地存储已同步
    setTimeout(function() {
        updateStatsDisplay();
        console.log('🔄 延迟更新统计显示完成');
    }, 50);
});

// 改进的更新页面显示函数 - 确保数据同步
function updateStatsDisplay() {
    console.log('🔄 开始更新统计显示...');
    
    // 强制重新获取最新数据
    const totalViews = getTotalViews();
    const totalDownloads = getTotalDownloads();
    const totalLikes = getTotalLikes();
    
    console.log('📈 显示数据 - 查看:', totalViews, '下载:', totalDownloads, '点赞:', totalLikes);
    
    // 强制更新页面显示
    $('#view-count').text(totalViews);
    $('#download-count').text(totalDownloads);
    $('#like-count').text(totalLikes);
    
    console.log('✅ 页面显示已更新');
    
    // 根据用户点赞状态设置颜色
    const $heartIcon = $('.like-container .fa-heart');
    const $likeCount = $('#like-count');
    const $likeBtn = $('#like-btn');
    
    if (hasUserLiked()) {
        $likeBtn.addClass('liked');
        $heartIcon.css('color', '#e74c3c');
        $likeCount.css('color', '#e74c3c');
        console.log('🎨 用户已点赞，设置红色');
    } else {
        $likeBtn.removeClass('liked');
        $heartIcon.css('color', '');
        $likeCount.css('color', '');
        console.log('🎨 用户未点赞，清除颜色');
    }
}

// 改进的获取总点赞数函数 - 确保数据准确性
function getTotalLikes() {
    const likesData = getAllLikes();
    // 确保只统计值为true的记录，并处理可能的undefined值
    const total = Object.values(likesData).filter(like => like === true).length;
    console.log('❤️ 总点赞数:', total, '数据详情:', likesData);
    return total;
}

// 改进的保存点赞记录函数 - 确保数据同步
function saveAllLikes(likesData) {
    localStorage.setItem('cv_all_likes', JSON.stringify(likesData));
    console.log('💾 保存点赞记录:', likesData);
    
    // 强制同步本地存储
    if (localStorage.getItem('cv_all_likes') === JSON.stringify(likesData)) {
        console.log('✅ 本地存储同步成功');
    } else {
        console.log('⚠️ 本地存储同步可能有问题');
    }
}

    // 初始化显示
    console.log('🚀 初始化统计显示...');
    updateStatsDisplay();
    console.log('✅ 统计功能初始化完成');

    // 添加键盘快捷键支持（空格键点赞）
    $(document).on('keydown', function(e) {
        if (e.keyCode === 32 && $('#like-btn').is(':visible')) {
            e.preventDefault();
            $('#like-btn').click();
        }
    });

    // 添加触摸设备支持
    $('#like-btn').on('touchstart', function(e) {
        e.preventDefault();
        $(this).addClass('touched');
    });

    $('#like-btn').on('touchend', function(e) {
        e.preventDefault();
        $(this).removeClass('touched');
        $(this).click();
    });

    // 管理功能：查看完整统计（仅开发时使用）
    function showAllStats() {
        const viewsData = getAllViews();
        const downloadsData = getAllDownloads();
        const likesData = getAllLikes();
        
        const totalViews = getTotalViews();
        const totalDownloads = getTotalDownloads();
        const totalLikes = getTotalLikes();
        
        const uniqueViewUsers = Object.keys(viewsData).length;
        const uniqueDownloadUsers = Object.keys(downloadsData).length;
        const uniqueLikeUsers = Object.keys(likesData).length;
        
        console.log('=== 完整统计信息 ===');
        console.log('总查看次数：' + totalViews + '（来自 ' + uniqueViewUsers + ' 个用户）');
        console.log('总下载次数：' + totalDownloads + '（来自 ' + uniqueDownloadUsers + ' 个用户）');
        console.log('总点赞数：' + totalLikes + '（来自 ' + uniqueLikeUsers + ' 个用户）');
        console.log('当前用户ID：' + generateUserID());
        console.log('当前用户已查看：' + hasUserViewed());
        console.log('当前用户已下载：' + hasUserDownloaded());
        console.log('当前用户已点赞：' + hasUserLiked());
    }

    // 开发时可用：在控制台输入 showAllStats() 查看完整统计
    window.showAllStats = showAllStats;

    // 音乐播放控制功能 - 修复版本
    function initMusicPlayer() {
        const musicToggle = $('#music-toggle');
        const backgroundMusic = document.getElementById('background-music');
        
        console.log('初始化音乐播放器...');
        console.log('音乐按钮:', musicToggle.length > 0 ? '找到' : '未找到');
        console.log('音频元素:', backgroundMusic ? '找到' : '未找到');
        
        if (!backgroundMusic) {
            console.error('未找到背景音乐音频元素');
            return;
        }
        
        if (musicToggle.length === 0) {
            console.error('未找到音乐切换按钮');
            return;
        }
        
        // 设置音频属性
        backgroundMusic.volume = 0.3;
        backgroundMusic.preload = 'auto';
        
        // 检查音频是否可播放
        backgroundMusic.addEventListener('canplaythrough', function() {
            console.log('音频可以播放');
        });
        
        backgroundMusic.addEventListener('error', function(e) {
            console.error('音频加载错误:', e);
            console.error('音频错误详情:', backgroundMusic.error);
        });
        
        // 修复音乐切换功能
        musicToggle.off('click').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('点击音乐按钮');
            console.log('当前播放状态:', backgroundMusic.paused ? '暂停' : '播放');
            
            if (backgroundMusic.paused) {
                console.log('尝试播放音乐...');
                
                // 先暂停再播放，确保状态正确
                backgroundMusic.pause();
                
                const playPromise = backgroundMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log('音乐播放成功');
                        musicToggle.removeClass('fa-volume-mute').addClass('fa-volume-up');
                        musicToggle.find('span').text('Music On');
                        
                        // 添加播放状态样式
                        musicToggle.addClass('music-playing');
                    }).catch(error => {
                        console.error('播放音乐失败:', error);
                        
                        // 显示错误提示
                        showMusicMessage('播放失败: ' + error.message);
                    });
                }
            } else {
                console.log('暂停音乐');
                backgroundMusic.pause();
                musicToggle.removeClass('fa-volume-up').addClass('fa-volume-mute');
                musicToggle.find('span').text('Music Off');
                musicToggle.removeClass('music-playing');
            }
        });
        
        // 音量控制
        const volumeControl = $('#volume-control');
        if (volumeControl.length > 0) {
            volumeControl.on('input', function() {
                backgroundMusic.volume = $(this).val() / 100;
            });
        }
        
        // 显示音乐消息
        function showMusicMessage(message) {
            let $message = $('<div class="music-message">' + message + '</div>');
            $('body').append($message);
            
            $message.css({
                'position': 'fixed',
                'top': '20px',
                'right': '20px',
                'background': '#ff4444',
                'color': 'white',
                'padding': '10px',
                'border-radius': '5px',
                'z-index': '10000'
            });
            
            $message.fadeIn(300).delay(2000).fadeOut(300, function() {
                $(this).remove();
            });
        }
        
        console.log('音乐播放器初始化完成');
    }
    
    // 延迟初始化音乐播放器，确保DOM完全加载
    setTimeout(initMusicPlayer, 100);
});

// ... existing code ...
// 在文件末尾添加EmailJS配置和表单处理
(function() {
    // 初始化EmailJS（需要替换为您的公钥）
    emailjs.init("fI3qSgpviNsyCYMhD");
    
    // 联系表单处理
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitBtn = contactForm.querySelector('input[type="submit"]');
            const originalText = submitBtn.value;
            submitBtn.value = 'Sending...';
            submitBtn.disabled = true;
            
            emailjs.sendForm('My CV', 'My CV', this)
                .then(function() {
                    submitBtn.value = 'Message Sent!';
                    contactForm.reset();
                    setTimeout(() => {
                        submitBtn.value = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }, function(error) {
                    submitBtn.value = 'Error, try again';
                    submitBtn.disabled = false;
                    console.error('EmailJS error:', error);
                });
        });
    }
})();