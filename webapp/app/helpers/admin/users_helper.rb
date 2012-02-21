module Admin::UsersHelper

  def build_roles
    roles = User::ROLES
    roles.delete('anonymous')
    roles.map {|r| r.to_a.push(r) }
  end
end
