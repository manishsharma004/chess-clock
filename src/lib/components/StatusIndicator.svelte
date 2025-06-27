<script lang="ts">
    export let gameState: string;
</script>

<span class="status-indicator {gameState}">
    {gameState === 'idle'
        ? 'Ready to Start'
        : gameState === 'playing'
          ? 'Game in Progress'
          : 'Paused'}
</span>

<style lang="scss">
    .status-indicator {
        padding: 0.5rem 1.5rem;
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
        &.idle {
            background: rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.8);
        }
        &.playing {
            background: rgba(46, 213, 115, 0.2);
            color: #2ed573;
            border-color: rgba(46, 213, 115, 0.3);
            animation: pulse 2s infinite;
        }
        &.paused {
            background: rgba(255, 165, 2, 0.2);
            color: #ffa502;
            border-color: rgba(255, 165, 2, 0.3);
        }
    }
    @keyframes pulse {
        0%,
        100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
</style>
