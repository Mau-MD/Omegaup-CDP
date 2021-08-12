
#include <iostream>
#include <fstream>
#include <string>

using namespace std;

int main() {
  const string GRUPO = "easy/";
  const string CASO = "1"; 
  
  ifstream in(GRUPO + CASO + ".in");
  streambuf *cinbuf = cin.rdbuf();
  cin.rdbuf(in.rdbuf());
  
  ios_base::sync_with_stdio(0);
  cin.tie(0);
    
  ofstream out(GRUPO + CASO +".out");
  streambuf *coutbuf = cout.rdbuf(); 
  cout.rdbuf(out.rdbuf()); 

  int a,b;
  cin>>a>>b;
  cout<<a + b<<endl;
  cout<<a * b;

}
