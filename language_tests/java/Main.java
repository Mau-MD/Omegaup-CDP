import java.io.*;
import java.util.Scanner;

public class CasesWindow {

	public static void main(String[] args) throws FileNotFoundException {
		final String GRUPO = "sin_grupo/"; // sin_grupo/, easy/, ...
		final String CASO = "1";

		PrintStream outStream = new PrintStream(new File(GRUPO + CASO + ".out"));
		System.setOut(outStream);

		Scanner input = new Scanner(new File(GRUPO + CASO + ".in"));

		int a = input.nextInt();
		int b = input.nextInt();

		System.out.print(a + b);
	}
}
