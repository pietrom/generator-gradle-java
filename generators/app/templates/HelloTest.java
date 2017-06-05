package <%= groupId %>.hello;

import org.junit.*;

public class HelloTest {
	@Test
	public void shouldSayHelloWorld() {
		Hello sut = new Hello();
		Assert.assertEquals("Hello, World!", sut.sayHello());
	}
}