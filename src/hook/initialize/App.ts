function setGlobalCssProperty() {
    // read local set global css property

    // for element-wise
    document.body.style.setProperty('--el-color-danger', 'var(--error-font-color)');
}

export {
    setGlobalCssProperty
};