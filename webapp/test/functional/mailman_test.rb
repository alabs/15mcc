require 'test_helper'

class MailmanTest < ActionMailer::TestCase
  test "abuse" do
    mail = Mailman.abuse
    assert_equal "Abuse", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
