#include <iostream>
#include <cstring>
#include <string>

using namespace std;

int main() {
	const string GRUPO = "sin_grupo/"; // sin_grupo/, easy/
	const string CASO = "1";
	
	const string dirIN(GRUPO + CASO + ".in");
	const string dirOUT(GRUPO + CASO + ".out");

	freopen(&dirIN[0], "r", stdin);
	freopen(&dirOUT[0], "w", stdout);

	int a, b;
	cin>>a>>b;
	cout<<a + b<<"\n"<<a * b<<endl;
}
