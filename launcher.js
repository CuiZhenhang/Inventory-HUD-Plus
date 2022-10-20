ConfigureMultiplayer({
    name: __mod__.getName(),
    version: __mod__.getVersion(),
    isClientOnly: __config__.getBool('clientOnly')
})
Launch()
