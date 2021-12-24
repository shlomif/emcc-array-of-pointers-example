#include <stdlib.h>

#define LEN 20
char * * gen_array(void)
{
    char **ret = malloc(LEN * sizeof(ret[0]));
    for (int i = 0; i < LEN; i++) {
        ret[i]=NULL;
    }
    return ret;
}
