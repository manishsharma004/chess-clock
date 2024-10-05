<script lang="ts">
    const TOTAL_TIME = 600000;
    let started = false;
    let selectedButton = '';
    let blackTimer = TOTAL_TIME;
    let whiteTimer = TOTAL_TIME;
    let intervalRef: number;

    const stopTimer = () => {
        clearInterval(intervalRef);
        intervalRef = 0;
    };

    const resetTimer = () => {
        stopTimer();
        blackTimer = TOTAL_TIME;
        whiteTimer = TOTAL_TIME;
        started = false;
    };

    const toggle = () => {
        if (intervalRef) {
            stopTimer();
        } else {
            startTimer();
        }
    };

    const startTimer = () => {
        stopTimer();

        intervalRef = setInterval(() => {
            if (selectedButton === 'white') {
                whiteTimer -= 100;
            } else if (selectedButton === 'black') {
                blackTimer -= 100;
            }
            if (blackTimer <= 0 || whiteTimer <= 0) {
                resetTimer();
            }
        }, 100);
    };

    const selectButton = (buttonId = '') => {
        selectedButton = buttonId;
        started = true;

        if (!intervalRef) {
            startTimer();
        }
    };

    const formatTime = (timeMs: number) => {
        const millis = timeMs % 1000;
        const deciSeconds = millis / 100;
        timeMs = Math.floor(timeMs / 1000);
        const seconds = timeMs % 60;
        const minutes = Math.floor(timeMs / 60);
        return `${minutes}m:${seconds}.${deciSeconds}s`;
    };
</script>

<div class="container">
    <div class="buttons">
        <button
            class={`button button-white ${selectedButton === 'white' ? 'selected' : ''}`}
            on:click={() => selectButton('black')}
            disabled={!started}
        >
            {formatTime(whiteTimer)}
        </button>
        <button
            class={`button button-black ${selectedButton === 'black' ? 'selected' : ''}`}
            on:click={() => selectButton('white')}
        >
            {formatTime(blackTimer)}
        </button>
    </div>
    <div class="actions">
        <button class="button reset-button" on:click={toggle} disabled={!started}
            >{#if !intervalRef}
                &#9658;
            {:else}
                &parallel;
            {/if}
        </button>
        <button class="button reset-button" on:click={resetTimer} disabled={!started}
            >&circlearrowleft;</button
        >
    </div>
</div>

<style lang="scss">
    :global(body) {
        margin: 0;
        padding: 0;
    }
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: absolute;

        .actions {
            display: flex;
            flex-direction: column;
            height: 100%;
            align-items: center;
            justify-content: center;
            min-width: 72pt;

            .button {
                border: none;
                background: none;
                font-size: 18pt;
                cursor: pointer;
                width: 40px;
                height: 40px;
                border-radius: 20px;
                -webkit-tap-highlight-color: transparent;

                &:hover,
                &:active {
                    background-color: rgba(0, 0, 0, 0.06);
                }
            }
            .reset-button {
            }
        }
        .buttons {
            position: relative;
            display: flex;
            flex-direction: column;
            --height: max(min(calc(100vh - 2rem), calc(2 * (100vw - 32px - 72pt))), 400px);
            height: var(--height);
            min-width: calc(var(--height) / 2);
            border-radius: calc(var(--height) / 2);
            margin: 1rem;

            .button {
                position: relative;
                width: 100%;
                height: 50%;
                border: none;
                overflow: hidden;
                font-size: 2rem;
                box-shadow: 1px -1px 3px 2px rgba(0, 0, 0, 0.2);
                -webkit-tap-highlight-color: transparent;

                &.button-black {
                    box-shadow: 1px -1px 3px 2px rgba(0, 0, 0, 0.3);
                }

                cursor: pointer;

                &:disabled {
                    cursor: not-allowed;
                    &::before {
                        content: ' ';
                        position: absolute;
                        display: inline-block;
                        background-color: rgba(0, 0, 0, 0.03);
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                    }
                }

                &.selected {
                    box-shadow: 2px -2px 5px 2px rgba(0, 0, 0, 0.3);

                    &.button-black {
                        box-shadow: 2px -2px 5px 2px rgba(0, 0, 0, 0.4);
                    }
                }

                &.selected::after {
                    content: ' ';
                    position: absolute;
                    display: inline-block;
                    // background-color: rgba(0, 0, 0, 0.2);
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                }
                &-white {
                    border-radius: 100% 100% 0 0;
                    background-color: rgb(250, 247, 247);
                    color: #222;
                }
                &-black {
                    background-color: rgb(12, 12, 12);
                    border-radius: 0 0 100% 100%;
                    margin-top: 0px;
                    color: #ddd;
                }
            }
        }
    }
</style>
