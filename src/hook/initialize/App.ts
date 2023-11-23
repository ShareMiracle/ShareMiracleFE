function setGlobalCssProperty() {
    // read local set global css property

    // for element-wise
    document.body.style.setProperty('--el-color-primary', 'var(--main-color)');
}

export {
    setGlobalCssProperty
};