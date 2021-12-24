#include <stdlib.h>
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
    arr[i] = strdup(val);
}
