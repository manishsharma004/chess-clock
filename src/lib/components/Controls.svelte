<script lang="ts">
    export let started: boolean;
    export let gameState: string;
    export let toggle: () => void;
    export let resetTimer: () => void;
</script>

<div class="controls">
    <button
        class="control-button play-pause {gameState === 'playing' ? 'playing' : ''} {!started
            ? 'disabled'
            : ''}"
        on:click={() => started && toggle()}
        title={gameState === 'playing' ? 'Pause' : 'Resume'}
    >
        {#if gameState === 'playing'}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
            </svg>
        {:else}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
            </svg>
        {/if}
    </button>
    <button
        class="control-button reset {!started ? 'disabled' : ''}"
        on:click={() => started && resetTimer()}
        title="Reset Game"
    >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path
                d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
            />
        </svg>
    </button>
</div>

<style lang="scss">
    .controls {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        left: calc(100% + 1rem);
    }
    .control-button {
        width: 60px;
        height: 60px;
        border: none;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);
        &:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
        &:active {
            transform: scale(0.95);
        }
        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none !important;
        }
        &.playing {
            background: rgba(46, 213, 115, 0.2);
            border-color: rgba(46, 213, 115, 0.3);
            animation: pulse 2s infinite;
        }
        svg {
            transition: transform 0.2s ease;
        }
        &:hover svg {
            transform: scale(1.1);
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
    @media (max-width: 768px) {
        .controls {
            flex-direction: row;
            gap: 1.5rem;
            left: unset;
            top: calc(100% + 1rem);
        }
        .control-button {
            width: 70px;
            height: 70px;
            font-size: 1.2rem;
        }
    }
    @media (max-width: 480px) {
        .control-button {
            width: 65px;
            height: 65px;
        }
        .controls {
            gap: 1.2rem;
        }
    }
    @media (max-width: 360px) {
        .control-button {
            width: 60px;
            height: 60px;
        }
    }
</style>
