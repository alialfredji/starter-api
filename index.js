/* eslint-disable */
'use strict';

/**
 * Production Run
 */
if (process.env.NODE_ENV === 'production') {
    require('@babel/polyfill');
    require('./build/src');
/**
 * Development Run
 */
} else {
    require('@babel/polyfill');
    require('@babel/register');
    require('./src');
}

// Let Docker exit on Ctrl+C
process.on('SIGINT', function() {
    process.exit();
});
