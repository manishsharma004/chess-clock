<script lang="ts">
    const TOTAL_TIME = 600000;
    let started = false;
    let selectedButton = '';
    let blackTimer = TOTAL_TIME;
    let whiteTimer = TOTAL_TIME;
    let intervalRef: number;
    let gameState = 'idle'; // 'idle', 'playing', 'paused'

    const stopTimer = () => {
        clearInterval(intervalRef);
        intervalRef = 0;
        gameState = 'paused';
    };

    const resetTimer = () => {
        stopTimer();
        blackTimer = TOTAL_TIME;
        whiteTimer = TOTAL_TIME;
        started = false;
        selectedButton = '';
        gameState = 'idle';
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
        gameState = 'playing';

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
        return `${minutes}:${seconds.toString().padStart(2, '0')}.${deciSeconds}`;
    };

    const getTimeColor = (timeMs: number) => {
        if (timeMs <= 10000) return '#ff4757'; // Red when under 10 seconds
        if (timeMs <= 30000) return '#ffa502'; // Orange when under 30 seconds
        return 'inherit';
    };
</script>

<svelte:head>
    <title>Chess Clock</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<div class="app">
    <div class="background">
        <div class="bg-gradient"></div>
        <div class="bg-pattern"></div>
    </div>

    <div class="container">
        <header class="header">
            <h1 class="title">Chess Clock</h1>
            <div class="game-status">
                <span class="status-indicator {gameState}">
                    {gameState === 'idle'
                        ? 'Ready to Start'
                        : gameState === 'playing'
                          ? 'Game in Progress'
                          : 'Paused'}
                </span>
            </div>
        </header>

        <main class="main">
            <div class="clock-container">
                <div class="clock-face">
                    <button
                        class="clock-button white {selectedButton === 'white'
                            ? 'active'
                            : ''} {started && selectedButton !== 'white' ? 'disabled' : ''}"
                        on:click={() =>
                            !(started && selectedButton !== 'white') && selectButton('black')}
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
                        class="clock-button black {selectedButton === 'black'
                            ? 'active'
                            : ''} {started && selectedButton !== 'black' ? 'disabled' : ''}"
                        on:click={() =>
                            !(started && selectedButton !== 'black') && selectButton('white')}
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
            </div>

            <div class="controls">
                <button
                    class="control-button play-pause {gameState === 'playing'
                        ? 'playing'
                        : ''} {!started ? 'disabled' : ''}"
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
        </main>
    </div>
</div>

<style lang="scss">
    :global(*) {
        box-sizing: border-box;
    }

    :global(body) {
        margin: 0;
        padding: 0;
        font-family:
            'Inter',
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            Roboto,
            sans-serif;
        overflow: hidden;
    }

    .app {
        width: 100vw;
        height: 100vh;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }

    .bg-gradient {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        background-size: 400% 400%;
        animation: gradientShift 30s ease infinite;
    }

    .bg-pattern {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: radial-gradient(
                circle at 25% 25%,
                rgba(255, 255, 255, 0.08) 0%,
                transparent 50%
            ),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.04) 0%, transparent 40%),
            radial-gradient(circle at 10% 60%, rgba(255, 255, 255, 0.06) 0%, transparent 45%),
            radial-gradient(circle at 90% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 35%);
        animation: float 40s ease-in-out infinite;
    }

    @keyframes float {
        0% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.6;
        }
        25% {
            transform: translateY(-8px) rotate(90deg) scale(1.02);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-12px) rotate(180deg) scale(1.03);
            opacity: 0.7;
        }
        75% {
            transform: translateY(-6px) rotate(270deg) scale(1.02);
            opacity: 0.8;
        }
        100% {
            transform: translateY(0px) rotate(360deg) scale(1);
            opacity: 0.6;
        }
    }

    @keyframes gradientShift {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 2rem;
        max-width: 1200px;
    }

    .header {
        text-align: center;
        margin-bottom: 2rem;
        z-index: 1;
    }

    .title {
        font-size: 3rem;
        font-weight: 700;
        color: white;
        margin: 0 0 1rem 0;
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        letter-spacing: -0.02em;
    }

    .game-status {
        display: flex;
        justify-content: center;
    }

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

    .main {
        display: flex;
        align-items: center;
        gap: 3rem;
        z-index: 1;
    }

    .clock-container {
        position: relative;
    }

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
                color: white;
                box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.2);
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
                color: white;
                box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.3);
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

    .controls {
        display: flex;
        flex-direction: column;
        gap: 1rem;
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

    @media (max-width: 768px) {
        .main {
            flex-direction: column;
            gap: 2rem;
            padding: 0 1rem;
        }

        .clock-face {
            width: 320px;
            height: 320px;
            min-width: 280px;
        }

        .time-display {
            font-size: 2.2rem !important;
        }

        .title {
            font-size: 2.2rem;
            margin-bottom: 0.5rem;
        }

        .controls {
            flex-direction: row;
            gap: 1.5rem;
        }

        .control-button {
            width: 70px;
            height: 70px;
            font-size: 1.2rem;
        }

        .header {
            margin-bottom: 1.5rem;
        }

        .status-indicator {
            font-size: 0.8rem;
            padding: 0.4rem 1.2rem;
        }

        .container {
            padding: 1rem;
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

        .title {
            font-size: 1.8rem;
        }

        .control-button {
            width: 65px;
            height: 65px;
        }

        .main {
            gap: 1.5rem;
        }

        .controls {
            gap: 1.2rem;
        }

        .active-indicator {
            width: 10px !important;
            height: 10px !important;
            top: 0.8rem !important;
            right: 0.8rem !important;
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

        .title {
            font-size: 1.6rem;
        }

        .control-button {
            width: 60px;
            height: 60px;
        }

        .container {
            padding: 0.5rem;
        }

        .main {
            gap: 1rem;
        }
    }

    /* Touch-friendly improvements */
    @media (hover: none) and (pointer: coarse) {
        .clock-button {
            min-height: 140px; /* Ensure minimum touch target size */

            &:active {
                transform: scale(0.98);
            }
        }

        .control-button {
            min-width: 60px;
            min-height: 60px;

            &:active {
                transform: scale(0.95);
            }
        }

        /* Remove hover effects on touch devices */
        .clock-face:hover {
            transform: none;
        }

        .clock-button:hover:not(:disabled) {
            transform: none;
        }

        .control-button:hover:not(:disabled) {
            transform: none;
            box-shadow: none;
        }
    }

    /* Landscape orientation for mobile */
    @media (max-width: 768px) and (orientation: landscape) {
        .main {
            flex-direction: row;
            gap: 1.5rem;
        }

        .clock-face {
            width: 280px;
            height: 280px;
        }

        .time-display {
            font-size: 1.8rem !important;
        }

        .title {
            font-size: 1.6rem;
            margin-bottom: 0.3rem;
        }

        .header {
            margin-bottom: 1rem;
        }

        .controls {
            gap: 1rem;
        }

        .control-button {
            width: 60px;
            height: 60px;
        }
    }

    /* Prevent zoom on input focus for iOS */
    @media screen and (-webkit-min-device-pixel-ratio: 0) {
        .clock-button {
            font-size: 16px; /* Prevents zoom on iOS */
        }
    }
</style>
