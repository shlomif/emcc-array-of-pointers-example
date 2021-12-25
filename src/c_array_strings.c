#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#define LEN 20
char * * gen_array(void)
{
    char **ret = malloc(LEN * sizeof(ret[0]));
    for (int i = 0; i < LEN; i++) {
        ret[i]=NULL;
    }
    return ret;
}

void array_set(char **arr, int i, char*val)
{
    free(arr[i]);
    arr[i] = strdup(val);
}

void array_print(char **arr, int i)
{
    printf("arr[%d] = %s\n", i, arr[i]);
}

void array_free(char * *ret)
{
    for (int i = 0; i < LEN; i++) {
        free(ret[i]);
    }
    free(ret);
}
