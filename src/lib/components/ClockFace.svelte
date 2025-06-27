<script lang="ts">
    export let whiteTimer: number;
    export let blackTimer: number;
    export let selectedButton: string;
    export let started: boolean;
    export let selectButton: (buttonId: string) => void;
    export let formatTime: (ms: number) => string;
    export let getTimeColor: (ms: number) => string;
</script>

<div class="clock-face">
    <button
        class="clock-button white {selectedButton === 'white' ? 'active' : ''} {!started
            ? 'disabled'
            : ''}"
        on:click={() => selectButton('black')}
    >
        <div class="time-display" style="color: {getTimeColor(whiteTimer)}">
            {formatTime(whiteTimer)}
        </div>
        <div class="player-label">WHITE</div>
        {#if selectedButton === 'white'}
            <div class="active-indicator"></div>
        {/if}
    </button>
    <div class="divider"></div>
    <button
        class="clock-button black {selectedButton === 'black' ? 'active' : ''} {started &&
        selectedButton !== 'black'
            ? 'disabled'
            : ''}"
        on:click={() => selectButton('white')}
    >
        <div class="time-display" style="color: {getTimeColor(blackTimer)}">
            {formatTime(blackTimer)}
        </div>
        <div class="player-label">BLACK</div>
        {#if selectedButton === 'black'}
            <div class="active-indicator"></div>
        {/if}
    </button>
</div>

<style lang="scss">
    .clock-face {
        width: 400px;
        height: 400px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(20px);
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        flex-direction: column;
        transition: transform 0.3s ease;
        &:hover {
            transform: scale(1.02);
        }
    }
    .clock-button {
        flex: 1;
        border: none;
        background: none;
        cursor: pointer;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        overflow: hidden;
        &.white {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            color: #212529;
            &:hover:not(:disabled) {
                background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
                transform: translateY(-2px);
            }
            &.active {
                background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
                color: #ffffff;
                box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.2);
                .time-display {
                    color: #ffffff !important;
                }
                .player-label {
                    color: #ffffff;
                }
            }
            .time-display {
                color: #212529;
            }
            .player-label {
                color: #495057;
            }
        }
        &.black {
            background: linear-gradient(135deg, #2d3436 0%, #636e72 100%);
            color: #f8f9fa;
            &:hover:not(:disabled) {
                background: linear-gradient(135deg, #636e72 0%, #2d3436 100%);
                transform: translateY(-2px);
            }
            &.active {
                background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
                color: #ffffff;
                box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.3);
                .time-display {
                    color: #ffffff !important;
                }
                .player-label {
                    color: #ffffff;
                }
            }
            .time-display {
                color: #f8f9fa;
            }
            .player-label {
                color: #dee2e6;
            }
        }
        &:disabled {
            cursor: not-allowed;
            opacity: 0.6;
            transform: none !important;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.1);
                z-index: 1;
            }
        }
        .time-display {
            font-size: 2.5rem;
            font-weight: 700;
            font-variant-numeric: tabular-nums;
            margin-bottom: 0.5rem;
            transition: color 0.3s ease;
            z-index: 2;
            position: relative;
        }
        .player-label {
            font-size: 0.875rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            opacity: 0.8;
            z-index: 2;
            position: relative;
        }
        .active-indicator {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #00b894;
            box-shadow: 0 0 10px rgba(0, 184, 148, 0.5);
            animation: blink 1s infinite;
        }
    }
    @keyframes blink {
        0%,
        50% {
            opacity: 1;
        }
        51%,
        100% {
            opacity: 0.5;
        }
    }
    .divider {
        height: 2px;
        background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
        );
        position: relative;
        z-index: 2;
    }
    @media (max-width: 768px) {
        .clock-face {
            width: 320px;
            height: 320px;
            min-width: 280px;
        }
        .time-display {
            font-size: 2.2rem !important;
        }
    }
    @media (max-width: 480px) {
        .clock-face {
            width: 280px;
            height: 280px;
            min-width: 250px;
        }
        .time-display {
            font-size: 1.8rem !important;
        }
        .player-label {
            font-size: 0.75rem !important;
        }
    }
    @media (max-width: 360px) {
        .clock-face {
            width: 250px;
            height: 250px;
            min-width: 220px;
        }
        .time-display {
            font-size: 1.6rem !important;
        }
    }
</style>
