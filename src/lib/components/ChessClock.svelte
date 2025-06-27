<script lang="ts">
    import ClockFace from '@components/ClockFace.svelte';
    import Controls from '@components/Controls.svelte';
    import StatusIndicator from '@components/StatusIndicator.svelte';

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
        if (!started && buttonId !== 'white') {
            return;
        }
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
        if (timeMs <= 10000) return '#ff4757';
        if (timeMs <= 30000) return '#ffa502';
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
                <StatusIndicator {gameState} />
            </div>
        </header>
        <main class="main">
            <div class="clock-controls-wrapper">
                <div class="clock-container">
                    <ClockFace
                        {whiteTimer}
                        {blackTimer}
                        {selectedButton}
                        {started}
                        {selectButton}
                        {formatTime}
                        {getTimeColor}
                    />
                </div>
                <Controls {started} {gameState} {toggle} {resetTimer} />
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
    .main {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        z-index: 1;
    }
    .clock-controls-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2.5rem;
        width: 100%;
    }
    .clock-container {
        position: relative;
    }
</style>
