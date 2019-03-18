<template>
    <div class="mine-container">
        <div class="mine-user">
            <div class="user-avatar">
                <img src="../../assets/images/default_avatar.png">
            </div>
            <div class="user-name">Young</div>
        </div>
        <div class="mine-wrap">
            <router-link to="/history" class="mine-item my-history">
                <i class="icon"></i>
                <span class="text">最近播放</span>
            </router-link>
            <div class="mine-item my-favorites">
                <i class="icon"></i>
                <span class="text">我的收藏</span>
            </div>
            <div class="mine-item created-playlist">
                <i class="icon"></i>
                <span class="text">我创建的歌单</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    activated() {
        document.title = '我的'
    }
}
</script>

<style scoped lang="less">
.mine-container {
    .mine-user {
        display: flex;
        align-items: center;
        padding: 20px 0;
        .user-avatar {
            flex: 0 0 60px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 12px;
            img {
                width: 64px;
                height: 64px;
                margin-top: -2px;
            }
        }
        .user-name {
            flex: 1;
            font-size: 16px;
        }
    }
    .mine-wrap {
        border-top: .5px solid rgba(0, 0, 0, .1);
        border-bottom: .5px solid rgba(0, 0, 0, .1);
    }
    .mine-item {
        display: flex;
        height: 55px;
        padding-left: 20px;
        align-items: center;
        .icon {
            -webkit-flex: 0 0 25px;
            flex: 0 0 25px;
            width: 25px;
            height: 25px;
            margin-right: 20px;
        }
        .text {
            -webkit-flex: 1;
            flex: 1;
            height: 55px;
            line-height: 55px;
            border-bottom: .5px solid rgba(0, 0, 0, .1);
            font-size: 16px;
        }
        &:last-child {
            .text {
                border-bottom: none;
            }
        }
        &:active {
            background: #eee;
        }
    }
    .my-history {
        .icon {
            background: url(../../assets/images/icon_my_history.png) no-repeat;
            background-size: contain;
        }
    }
    .my-favorites {
        .icon {
            background: url(../../assets/images/icon_my_favorites.png) no-repeat;
            background-size: contain;
        }
    }
    .created-playlist {
        .icon {
            background: url(../../assets/images/icon_created_playlist.png) no-repeat;
            background-size: contain;
        }
    }
}
</style>
