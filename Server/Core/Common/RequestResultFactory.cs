using System;

namespace Core.Common
{
    public static class RequestResultFactory
    {
        public static RequestResult<TA> Success<TA>(TA result)
        {
            return new(true, result, string.Empty, null);
        }

        public static RequestResult<TA> Failure<TA>(string failureReason)
        {
            return new(true, default, failureReason, null);
        }

        public static RequestResult<TA> Failure<TA>(string failureReason, Exception exception)
        {
            return new(true, default, failureReason, exception);
        }
    }
}
