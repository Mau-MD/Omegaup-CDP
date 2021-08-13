#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
	const char *GRUPO = "sin_grupo/"; // sin_grupo, easy, ...
	const char *CASO = "1";
	
	char *dirIN = strcat(strcat(strcpy(malloc(strlen(GRUPO) + strlen(CASO) + 4), GRUPO), CASO), ".in");
	char *dirOUT = strcat(strcat(strcpy(malloc(strlen(GRUPO) + strlen(CASO) + 4), GRUPO), CASO), ".out");
	
	freopen(dirIN, "r", stdin);
	freopen(dirOUT, "w", stdout);

	int a, b;
	scanf("%d", &a);
	scanf("%d", &b);
	printf("%d", a + b);
	
}
