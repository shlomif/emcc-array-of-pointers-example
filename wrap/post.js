if (true) {
    const mysqrt = Module.cwrap('mysqrtC','number',['number']),
        mysqrtArray = Module.cwrap('mysqrtArrayC','undefined',['number','number','number']),
        createMyClass = Module.cwrap('createMyClassC','number',[]),
        deleteMyClass = Module.cwrap('deleteMyClassC','undefined',['number']),
        setMyClassValue = Module.cwrap('setMyClassValueC','undefined',['number','number']),
        getMyClassAnswer = Module.cwrap('getMyClassAnswerC','number',['number']);
    const gen_array = Module.cwrap('gen_array','number',[]);
    const array_free = Module.cwrap('array_free','undefined', ['number']);
    const array_set = Module.cwrap('array_set','undefined',['number', 'number','string']);
    const array_print = Module.cwrap('array_print','undefined',['number', 'number']);
    const fc_solve_allocate_i8 = (p1) => {
        return Module.allocate(p1, "i8", Module.ALLOC_STACK);
    };
    const fc_solve_Pointer_stringify = (ptr) => {
        return Module.UTF8ToString(ptr, 10000);
    };
    function array_demo() {
        const arr = gen_array();
        array_set(arr, 0, "value zero");
        console.log("arr0 = " + fc_solve_Pointer_stringify(Module.getValue(arr, '*')));
        array_print(arr, 0);
        const ptr_width = 4;
        const str_ptr = fc_solve_allocate_i8(
                                             Module.intArrayFromString(
                                                                       "spaceship surprise"
                                             ),
        );
        Module.setValue(arr + ptr_width*3, str_ptr, "*")
        array_print(arr, 3);
        array_free(arr);
        return;
    };
// array_demo();
    return {
        Module: Module,
        array_demo: array_demo,
        onRuntimeInitialized: () => {
            array_demo();
        },
        mysqrt: mysqrt,
        mysqrtArray: function (a) {
            const nDataBytes = a.length * Float32Array.BYTES_PER_ELEMENT,
                aHeap = Module._malloc(nDataBytes),
                bHeap = Module._malloc(nDataBytes),
                b = new Array(a.length);

            for (let i = 0; i < a.length; i++) {
                Module.setValue(aHeap + i * Float32Array.BYTES_PER_ELEMENT, a[i], 'float');
            }

            mysqrtArray(a.length, aHeap, bHeap);

            for (let i = 0; i < a.length; i++) {
                b[i] = Module.getValue(bHeap + i * Float32Array.BYTES_PER_ELEMENT, 'float');
            }

            Module._free(aHeap);
            Module._free(bHeap);

            return b;
        },
        createMyClass: createMyClass,
        deleteMyClass: deleteMyClass,
        setMyClassValue: setMyClassValue,
        getMyClassAnswer: getMyClassAnswer
    };

}
}));
