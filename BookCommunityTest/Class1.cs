﻿using Xunit;

namespace BookCommunityTest
{
    public class Class1
    {
        [Fact]
        public void PassingTest()
        {
            Assert.Equal(4, Add(2, 2));
        }

        [Fact]
        public void FailingTest()
        {
            Assert.Equal(3, Add(2, 2));
        }

        int Add(int x, int y)
        {
            return x + y;
        }
    }
}
