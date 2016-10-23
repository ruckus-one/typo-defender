QUnit.test( "Number Formatting", function( assert ) {



    assert.deepEqual( GUIHelper.formatNumber(0), '0' );
    assert.deepEqual( GUIHelper.formatNumber(10), '10' );
    assert.deepEqual( GUIHelper.formatNumber(999), '999' );
    assert.deepEqual( GUIHelper.formatNumber(1121), '1,121' );
    assert.deepEqual( GUIHelper.formatNumber(9998), '9,998' );
    assert.deepEqual( GUIHelper.formatNumber(12000), '12,000' );
    assert.deepEqual( GUIHelper.formatNumber(99997), '99,997' );
    assert.deepEqual( GUIHelper.formatNumber(100000), '100,000' );
    assert.deepEqual( GUIHelper.formatNumber(500000), '500,000' );
    assert.deepEqual( GUIHelper.formatNumber(1000001), '1,000,001' );
    assert.deepEqual( GUIHelper.formatNumber(123456789), '123,456,789' );
});