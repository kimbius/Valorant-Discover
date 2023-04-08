<div class="lds-dual-ring"></div>

<style type="postcss">

    .lds-dual-ring {
        display: inline-block;
        width: 80px;
        height: 80px;
    }
    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        animation: lds-dual-ring 1.2s linear infinite;
        @apply border-[5px] border-main-400 border-y-transparent;
    }
    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg) scale(1);
        }
        100% {
            transform: rotate(360deg) scale(0.9);
        }
    }
</style>
